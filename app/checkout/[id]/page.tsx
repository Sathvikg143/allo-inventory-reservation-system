export default async function Checkout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Reservation Created
        </h1>

        <p className="text-zinc-400 mb-8">
          Your inventory has been reserved.
          Confirm to finalize or release to cancel.
        </p>

        <div className="border border-zinc-700 rounded-xl p-8">

          <div className="mb-8">

            <div className="text-zinc-500 mb-2">
              Reservation ID
            </div>

            <div className="font-mono text-lg break-all">
              {id}
            </div>

          </div>

          <div className="flex gap-4">

            <form
              action={`/checkout/${id}/confirmed`}
              method="POST"
            >
              <button
                className="
                px-6
                py-3
                rounded-lg
                bg-green-600
                hover:bg-green-700
                font-semibold
                cursor-pointer
                "
              >
                Confirm Reservation
              </button>
            </form>

            <form
              action={`/checkout/${id}/released`}
              method="POST"
            >
              <button
                className="
                px-6
                py-3
                rounded-lg
                border
                border-red-500
                hover:bg-red-600
                font-semibold
                cursor-pointer
                "
              >
                Release Reservation
              </button>
            </form>

          </div>

        </div>

        <div className="mt-8">

          <a
            href="/"
            className="
            inline-block
            text-zinc-400
            hover:text-white
            "
          >
            ← Back to Inventory
          </a>

        </div>

      </div>

    </main>
  );
}