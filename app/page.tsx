export default function Home() {
  return (
    <main className="p-10">
      <h1>Inventory Reservation System</h1>

      <p>Backend APIs implemented.</p>

      <ul>
        <li>GET /api/products</li>
        <li>POST /api/reservations</li>
        <li>POST /api/reservations/[id]/confirm</li>
        <li>POST /api/reservations/[id]/release</li>
      </ul>
    </main>
  );
}