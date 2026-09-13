async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=5", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products as Array<{ title: string }>;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.title}>{product.title}</li>
        ))}
      </ul>
    </main>
  );
}
