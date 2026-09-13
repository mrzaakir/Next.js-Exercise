export default function SSRPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>SSR Simulation</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </main>
  );
}
