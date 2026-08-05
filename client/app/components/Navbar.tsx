export default function Navbar() {
  return (
    <header className="w-full border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-cyan-400">
          LingoScript AI
        </div>

        {/* Navigation */}
        <nav className="hidden gap-8 text-sm text-gray-300 md:flex">
          <a href="#" className="transition hover:text-cyan-400">
            Home
          </a>

          <a href="#" className="transition hover:text-cyan-400">
            Features
          </a>

          <a href="#" className="transition hover:text-cyan-400">
            Pricing
          </a>

          <a href="#" className="transition hover:text-cyan-400">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <button className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400">
          Sign In
        </button>
      </div>
    </header>
  );
}
