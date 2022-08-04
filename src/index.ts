import { Hono } from "hono";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";

const API = new Hono();

API.get("/", (c) => c.text("hi"));

API.get("/v1/*", async (c) => {
  const trpcRes = await fetchRequestHandler({
    endpoint: "/v1",
    req: c.req,
    router: appRouter,
  });

  c.status(trpcRes.status as any);
  return c.body(trpcRes.body);
});

export default {
  async fetch(r: Request, e: any, c: ExecutionContext) {
    return API.fetch(r, e, c);
  },
};
