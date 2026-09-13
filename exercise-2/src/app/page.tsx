export default function HomePage() {
  return (
    <main style={{ padding: "2rem", lineHeight: 1.8 }}>
      <h1>Exercise 2</h1>
      <ul>
        <li><a href="/products">Server Component Exercise</a></li>
        <li><a href="/counter">Client Component Exercise</a></li>
        <li><a href="/ssr">SSR Simulation Exercise</a></li>
        <li><a href="/about">Static Page Exercise</a></li>
        <li><a href="/streaming">Streaming Exercise</a></li>
      </ul>
    </main>
  );
}
