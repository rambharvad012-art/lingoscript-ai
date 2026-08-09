"use client";

import { useRef, useState } from "react";

export default function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
  };

  return (
    <section id="upload" className="bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border-2 border-dashed border-cyan-500 p-12 text-center">

        <h2 className="text-4xl font-bold text-cyan-400">
          Upload Your Video
        </h2>

        <p className="mt-5 text-lg text-gray-400">
          Select a video from your device to start transcription and AI analysis.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-8 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          Choose Video
        </button>

        {fileName && (
          <p className="mt-6 text-sm text-gray-300">
            Selected: {fileName}
          </p>
        )}

      </div>
    </section>
  );
}
