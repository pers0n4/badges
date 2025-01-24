import { STATUS_CODE, STATUS_TEXT } from "@std/http";
import * as log from "@std/log";
import { Badge } from "./badge.ts";

export default {
  fetch(request) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const [, slug] = pathname.split("/");

      const badge = new Badge(slug);

      return new Response(badge.toJson(), {
        status: STATUS_CODE.OK,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      log.error(error);
      return new Response(STATUS_TEXT[STATUS_CODE.BadRequest], {
        status: STATUS_CODE.BadRequest,
      });
    }
  },
} satisfies Deno.ServeDefaultExport;
