export default function Confirmed() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <div className="text-7xl mb-5">
          ✅
        </div>

        <h1 className="text-5xl font-bold">
          Reservation Confirmed
        </h1>

        <p className="mt-4 text-zinc-400">
          Inventory reserved successfully.
        </p>

        <a
          href="/"
          className="
          inline-block
          mt-8
          px-6
          py-3
          bg-white
          text-black
          rounded-lg
          "
        >
          Back Home
        </a>

      </div>

    </main>
  );
}