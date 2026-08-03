# LingoScript AI – System Architecture
**Document Version:** 1.0
**Status:** Draft
**Author:** Rambharvad012-art
## 1. Architecture Overview
LingoScript AI is designed as a highly scalable, event-driven enterprise Software-as-a-Service (SaaS) application. The core engineering challenge of this platform is processing video files of **unbounded length** for transcription, summarization, and interactive querying.
To achieve this without blocking system resources or timing out, the architecture decouples the synchronous user-facing API from the asynchronous heavy-compute AI pipelines. The frontend is built on a modern Next.js stack, interfacing directly with Supabase for authentication and edge storage. The backend is purely powered by Python (FastAPI), providing high-performance asynchronous endpoints and orchestrating distributed GPU workers that process media streams in manageable, overlapping chunks.
## 2. High Level Architecture Diagram
```text
    +-------------------+                                  +----------------------+
    |   Next.js Client  | -------- Direct Upload --------> |   Supabase Storage   |
    |  (React/Tailwind) | <------- (Signed URLs) --------- |  (Video/Documents)   |
    +-------------------+                                  +----------------------+
            |                                                         |
            | REST / WebSockets                                       | Object Events
            v                                                         v
    +-------------------------------------------------------------------------+
    |                            FastAPI Backend                              |
    |                      (API, Orchestration & RAG)                         |
    +-------------------------------------------------------------------------+
            |                              |                              ^
            | Enqueue Job                  | Read / Write                 | JWT Validation
            v                              v                              |
    +-------------------+        +---------------------+       +----------------------+
    |   Message Queue   |        | PostgreSQL (DB)     |       |    Supabase Auth     |
    |  (Redis/Celery)   |        | (Relational +       | ----> |    (User Identity)   |
    +-------------------+        |  pgvector)          |       +----------------------+
            |                    +---------------------+
            | Pull Job
            v
    +-------------------------------------------------------------------------+
    |                        AI Processing Workers (GPU)                      |
    |                                                                         |
    |  [ FFmpeg ] -> [ Chunk Manager ] -> [ Whisper ] -> [ LLM Pipeline ]     |
    +-------------------------------------------------------------------------+

```
## 3. Frontend Architecture
The presentation layer is designed for extreme responsiveness and optimized rendering, utilizing a modern React ecosystem.
 * **Next.js (App Router):** Serves as the React framework, providing Server-Side Rendering (SSR) for SEO-critical pages (like landing/pricing) and Static Site Generation (SSG) combined with Client-Side Rendering (CSR) for the highly interactive dashboard and AI Chat interfaces.
 * **React:** Component-based UI development utilizing modern Hooks pattern for state and lifecycle management.
 * **TypeScript:** Enforces strict static typing across the client application, ensuring type safety when consuming FastAPI schemas and Supabase payloads.
 * **Tailwind CSS:** Utility-first CSS framework for building a fully responsive, accessible, and customizable enterprise-grade user interface without bloated stylesheets.
## 4. Backend Architecture
The backend infrastructure is built entirely on Python to natively support AI/ML ecosystems while maintaining high web-server performance. Node.js and Express are strictly excluded.
 * **Framework:** **FastAPI**. Chosen for its high performance (powered by Starlette and Pydantic), native asynchronous I/O (async/await), and automatic OpenAPI documentation generation.
 * **Task Orchestration:** Celery (with Redis as the broker) is used to offload long-running transcription tasks from the FastAPI event loop, ensuring the web API remains highly responsive.
 * **Data Validation:** Pydantic models govern all API request/response payloads, ensuring strict data contracts between the Next.js client and the Python backend.
## 5. AI Processing Pipeline
To support videos of unlimited duration, the system utilizes a **Chunk-Processing Pipeline**. Processing a 10-hour video natively in one pass exceeds memory limits; chunking solves this natively.
 1. **FFmpeg Extraction:** The GPU worker downloads the video file from Supabase Storage and extracts an optimized audio stream (e.g., 16kHz, mono WAV).
 2. **Chunk Processing:** The audio is divided into overlapping segments (e.g., 15-minute chunks with a 30-second overlap to preserve sentence context across boundaries).
 3. **Whisper Transcription:** OpenAI's Whisper model (via Python bindings) processes these chunks in parallel across available GPU threads.
 4. **Timestamp Generation & Stitching:** A stitching algorithm deduplicates the overlapping text and calculates global timestamps by adding the chunk's absolute start time to the relative timestamps generated by Whisper.
 5. **Subtitle Generation:** The stitched, timestamp-aware transcript is formatted into standard SRT structure.
 6. **AI Summary & Key Points:** The full transcript is passed to a Large Language Model (LLM) utilizing a Map-Reduce summarization chain to extract concise overviews and bulleted key points.
 7. **AI Chat (RAG):** The transcript is split into semantic blocks, embedded using an embedding model, and stored in the database to power contextual Q&A.
## 6. Database Architecture
The persistence layer is managed entirely within the **Supabase** ecosystem, providing a robust, scalable backend-as-a-service foundation.
 * **PostgreSQL:** The core relational database storing users, video metadata, processing statuses, and full-text transcripts. Uses the pgvector extension to store semantic embeddings of transcripts for the AI Chat feature.
 * **Supabase Auth:** Handles JWT issuance, OAuth providers, and session management. Seamlessly integrates with PostgreSQL via Row Level Security (RLS) policies.
 * **Supabase Storage:** An S3-compatible object storage layer handling raw video uploads, extracted audio caches, and exported document artifacts (PDF/DOCX/TXT).
## 7. File Upload Flow
To prevent the FastAPI backend from being a bandwidth bottleneck during massive video uploads, a direct-to-storage approach is utilized:
 1. Client requests a **Presigned Upload URL** from FastAPI, passing file metadata (size, MIME type).
 2. FastAPI validates the user's quota and permissions, creates a "Pending" video record in PostgreSQL, and returns the signed URL.
 3. Client streams the video directly to Supabase Storage.
 4. Upon completion, the client notifies FastAPI, which updates the DB status to "Uploaded" and triggers the processing queue.
## 8. Video Processing Flow
 1. FastAPI enqueues a ProcessVideoTask in the Redis message broker.
 2. An available Python Worker (Celery node) picks up the task.
 3. The worker executes the **AI Processing Pipeline** (Download -> FFmpeg -> Chunk -> Whisper -> Stitch -> LLM Summarize -> Embed).
 4. Throughout processing, the worker updates the PostgreSQL record status (e.g., "Extracting Audio", "Transcribing 45%").
 5. FastAPI broadcasts these state changes to the Next.js client via WebSockets or Server-Sent Events (SSE).
 6. Once complete, artifacts (SRT, Summary) are saved to DB/Storage, and status is marked "Completed".
## 9. AI Chat Flow
 1. User submits a question in the Next.js UI regarding a specific video.
 2. FastAPI receives the query and converts it into a vector embedding using the same model used during video processing.
 3. FastAPI performs a Cosine Similarity search in PostgreSQL (pgvector) to retrieve the top-K most relevant transcript chunks.
 4. A system prompt is constructed containing the user's query and the retrieved transcript chunks (Retrieval-Augmented Generation).
 5. The prompt is sent to an LLM, and the response is streamed back to the client via a generator in FastAPI.
## 10. Export Flow
 1. Client requests an export (TXT, PDF, DOCX, SRT) via a FastAPI endpoint.
 2. FastAPI queries PostgreSQL for the complete stitched transcript and timestamps.
 3. For TXT/SRT: FastAPI formats the string directly.
 4. For PDF/DOCX: FastAPI utilizes Python libraries (ReportLab for PDF, python-docx for DOCX) to dynamically generate the binary file in memory.
 5. The file is either streamed directly back to the client as a download response or uploaded to Supabase Storage (returning a temporary download link).
## 11. Security Architecture
 * **Row Level Security (RLS):** Enforced natively at the PostgreSQL level. Users can only SELECT, UPDATE, or DELETE records where user_id == auth.uid().
 * **Stateless Authentication:** All API requests to FastAPI require a valid Supabase JWT in the Authorization: Bearer header. FastAPI validates this token's signature using the Supabase JWT secret.
 * **Storage Access:** Private buckets are used. Media is only accessible via temporary, time-bound signed URLs.
 * **Input Validation:** Pydantic heavily sanitizes all incoming payloads to prevent injection attacks.
## 12. Scalability Strategy
 * **Stateless API:** The FastAPI layer holds no state, allowing it to be horizontally scaled behind a load balancer to handle high concurrent user traffic.
 * **Worker Auto-scaling:** The AI processing workers (which consume high CPU/GPU) are decoupled from the API. Using metrics like queue depth, infrastructure can dynamically spin up additional GPU instances when the backlog grows, and scale down to zero when idle to save costs.
 * **Database Scaling:** Connection pooling (PgBouncer) is utilized to manage FastAPI database connections efficiently.
## 13. Future Expansion
The architecture natively supports the following future capabilities without fundamental redesign:
 * **Speaker Diarization:** Adding a PyAnnote audio pipeline step before Whisper to label speaker segments (Speaker A, Speaker B).
 * **Multilingual Output:** Integrating an LLM translation step post-transcription to convert English/Hindi transcripts into 50+ languages natively.
 * **Live Stream Ingestion:** Modifying the chunking mechanism to read from an RTMP/HLS stream buffer instead of a static file for real-time live transcription.
## 14. Folder Responsibilities
```text
lingoscript-ai/
├── client/                     # Next.js Application
│   ├── app/                    # App Router pages and layouts
│   ├── components/             # Reusable UI components (Tailwind)
│   ├── lib/                    # Supabase client, utilities
│   └── store/                  # Client state management
├── server/                     # FastAPI Application
│   ├── api/                    # Route endpoints and controllers
│   ├── core/                   # Config, security, DB connections
│   ├── schemas/                # Pydantic models
│   └── services/               # DB CRUD, business logic
└── workers/                    # Celery / AI Processing Nodes
    ├── pipeline/               # Orchestration logic
    ├── ai/                     # Whisper, LLM, Embeddings wrappers
    └── media/                  # FFmpeg chunking and stitching scripts

```
## 15. Design Principles
 1. **API-First Design:** The FastAPI backend serves as the single source of truth. The frontend is treated as just one of many potential consumers.
 2. **Separation of Concerns:** Compute-heavy AI tasks are strictly isolated from the user-facing web API.
 3. **Graceful Degradation:** If AI summarization fails, the core transcription must still succeed and be delivered to the user.
 4. **Idempotency:** Processing jobs and exports are designed to be idempotent; retrying a failed video chunk will not corrupt the final output.
 5. **DRY (Don't Repeat Yourself):** Shared logic, especially Pydantic schemas and database models, are centralized to prevent drift between components.
    
