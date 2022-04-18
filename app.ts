import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import {
  Status,
  STATUS_TEXT,
} from "https://deno.land/std@0.135.0/http/http_status.ts";
import { Badge } from "./shields.ts";

function handler(req: Request): Response {
  const url = new URL(req.url);

  try {
    const badge = Badge.fromQueryString(url.searchParams);

    return new Response(JSON.stringify(badge), {
      status: Status.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(STATUS_TEXT.get(Status.BadRequest), {
      status: Status.BadRequest,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

console.log("Listening on http://localhost:8000");
await serve(handler);