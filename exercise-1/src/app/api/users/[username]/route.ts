type RouteContext = {
  params: Promise<{ username: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { username } = await context.params;

  return Response.json({ username });
}
