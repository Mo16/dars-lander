import { BUILDERS } from "./builders";

export function GET(req: Request) {
  const which = new URL(req.url).searchParams.get("type") ?? "waitlist";
  const builder = BUILDERS[which] ?? BUILDERS.waitlist;
  return new Response(builder(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
