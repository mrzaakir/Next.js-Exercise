type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function BlogPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = slug.length > 0 ? `/${slug.join("/")}` : "/";

  return <h1>You visited: {path}</h1>;
}
