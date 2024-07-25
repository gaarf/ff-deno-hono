import app from "@/app.ts";
import { toText } from "std/streams/mod.ts";

/** @param request {Fleek.HttpRequest} */
export const main = async ({ path, method, headers, body, query }) => {
  const url = new URL(
    "http://f" + path + "?" + new URLSearchParams(query).toString()
  );
  const req = new Request(url, {
    method,
    headers,
    body: ["HEAD", "GET"].includes(method)
      ? undefined
      : typeof body === "string"
      ? body
      : JSON.stringify(body),
  });

  const res = await app.fetch(req);

  return {
    status: res.status,
    body: res.body && await toText(res.body),
    headers: res.headers,
  };
};
