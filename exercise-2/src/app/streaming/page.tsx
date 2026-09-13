import { Suspense } from "react";

async function slowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div>Yow ZeCky, Loaded after 3 seconds</div>;
}

export default function StreamingPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Streaming Exercise</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AsyncContent />
      </Suspense>
    </main>
  );
}

async function AsyncContent() {
  return await slowComponent();
}
