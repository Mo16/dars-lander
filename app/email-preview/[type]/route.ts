import { BUILDERS } from "../builders";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  const builder = BUILDERS[type];
  if (!builder) {
    return new Response("Unknown email type", { status: 404 });
  }
  return new Response(builder(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
