export default function FeatureCards() {
  const features = [
    {
      title: "AI Transcription",
      description:
        "Generate highly accurate transcripts from long videos using AI.",
    },
    {
      title: "Smart Summaries",
      description:
        "Get concise summaries of lengthy lectures, podcasts and meetings.",
    },
    {
      title: "Interactive AI Chat",
      description:
        "Ask questions about your uploaded videos and receive instant answers.",
    },
    {
      title: "Subtitle Generator",
      description:
        "Create perfectly synchronized subtitles in multiple languages.",
    },
    {
      title: "Export Anywhere",
      description:
        "Download transcripts as TXT, PDF, DOCX or SRT subtitle files.",
    },
    {
      title: "Cloud Workspace",
      description:
        "Securely store and organize all your videos and transcripts.",
    },
  ];

  return (
    <section className="bg-black px-6 py-20 text-white">
      <h2 className="mb-12 text-center text-4xl font-bold text-cyan-400">
        Powerful AI Features
      </h2>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-cyan-700 bg-neutral-900 p-6 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <h3 className="mb-4 text-2xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
