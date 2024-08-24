import { CookieMethodsServer, createServerClient } from "@supabase/ssr";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { type Database } from "@/supabase/schema.gen.ts";
import { createMiddleware } from "hono/factory";
import { type AuthUser, type SupabaseClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "@/supabase/env.ts";

declare module "hono" {
  interface ContextVariableMap {
    db: SupabaseClient<Database>;
    user: AuthUser | null;
  }
}

export const middleware = () =>
  createMiddleware(async (c, next) => {
    const supabase = createClient(c);
    c.set("db", supabase);
    await userPromise(c);
    return next();
  });

export async function userPromise(c: Context) {
  const user = c.get("user");
  if (user) {
    return user;
  }
  const { data } = await c.get("db").auth.getUser();
  c.set("user", data.user);
  return data.user;
}

export const requireAuth = createMiddleware(async (c, next) => {
  const user = await userPromise(c);
  if (!user) {
    return c.redirect("/auth/login");
  }
  await next();
});

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
          setCookie(c, name, value, { ...options, maxAge: 60 * 60 });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };

  return createServerClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies,
    },
  );
}
