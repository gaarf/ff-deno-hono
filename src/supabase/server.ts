import { CookieMethodsServer, createServerClient } from "@supabase/ssr";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { type Database } from "@/supabase/schema.gen.ts";
import { createMiddleware } from "hono/factory";
import { type SupabaseClient } from "@supabase/supabase-js";
import { useRequestContext } from "@/server/context.ts";

declare module "hono" {
  interface ContextVariableMap {
    db: SupabaseClient<Database>;
    userId?: string;
  }
}

export const middleware = createMiddleware((c, next) => {
  const supabase = createClient(c);
  c.set("db", supabase);
  return next();
});

export const requireAuth = createMiddleware(async (c, next) => {
  const {
    data: { user },
  } = await c.get("db").auth.getUser();
  if (!user) {
    return c.redirect("/login");
  }
  c.set("userId", user.id);
  await next();
});

export function useSupabase() {
  return useRequestContext().get("db");
}

export function createClient(c: Context) {
  const cookies: CookieMethodsServer = {
    getAll() {
      return Object.entries(getCookie(c)).map(([name, value]) => ({
        name,
        value,
      }));
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(c, name, value, {...options, maxAge: 60 * 60 });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };

  return createServerClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      cookies,
    }
  );
}
