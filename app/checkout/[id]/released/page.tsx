export default function Released() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <div className="text-7xl mb-5">
          ↩️
        </div>

        <h1 className="text-5xl font-bold">
          Reservation Released
        </h1>

        <p className="mt-4 text-zinc-400">
          Reserved stock returned.
        </p>

        <a
          href="/"
          className="
          inline-block
          mt-8
          px-6
          py-3
          border
          rounded-lg
          "
        >
          Back Home
        </a>

      </div>

    </main>
  );
}