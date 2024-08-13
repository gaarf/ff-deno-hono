import { createServerClient } from "@supabase/ssr";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { type Database } from "@/supabase/schema.gen.ts";

export function createClient(c: Context) {
  return createServerClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookie(c)).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              setCookie(c, name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}