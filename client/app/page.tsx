export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-cyan-400">
        LingoScript AI
      </h1>

      <p className="mt-6 max-w-2xl text-center text-lg text-gray-300">
        AI-powered Video Transcription, Summarization and Interactive Chat
        Platform.
      </p>

      <button className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400">
        Get Started
      </button>
    </main>
  );
}
