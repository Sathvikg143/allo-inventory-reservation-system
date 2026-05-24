export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Inventory Reservation System
      </h1>

      <p className="mt-4">
        Backend APIs implemented and tested.
      </p>

      <div className="mt-8 space-y-2">
        <div>GET /api/products</div>
        <div>POST /api/reservations</div>
        <div>POST /api/reservations/[id]/confirm</div>
        <div>POST /api/reservations/[id]/release</div>
      </div>
    </main>
  );
}