export default function UploadSection() {
  return (
    <section className="bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border-2 border-dashed border-cyan-500 p-12 text-center">

        <h2 className="text-4xl font-bold text-cyan-400">
          Upload Your Video
        </h2>

        <p className="mt-5 text-lg text-gray-400">
          Drag & Drop your video here or click the button below to upload.
          Supported formats: MP4, MOV, AVI, MKV.
        </p>

        <button className="mt-8 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400">
          Choose Video
        </button>

      </div>
    </section>
  );
}
