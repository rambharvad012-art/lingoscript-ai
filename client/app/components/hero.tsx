export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-black px-6 text-center text-white">
      <span className="rounded-full border border-cyan-500 px-4 py-1 text-sm text-cyan-400">
        AI-Powered Video Intelligence
      </span>

      <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
        Transcribe, Summarize & Chat
        <br />
        with Your Videos
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-400">
        Upload long videos and get highly accurate transcripts, AI summaries,
        subtitles, timestamps, and an interactive chat experience in seconds.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button className="rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-black transition hover:bg-cyan-400">
          Upload Video
        </button>

        <button className="rounded-xl border border-cyan-500 px-7 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black">
          Watch Demo
        </button>
      </div>
    </section>
  );
}
