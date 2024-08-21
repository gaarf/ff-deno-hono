import { isBrowser } from "@/utils.ts";

declare global {
  const SUPABASE_URL: string;
  const SUPABASE_ANON_KEY: string;
}

DEV: {
  if (!isBrowser()) {
    /* @ts-expect-error */
    globalThis.SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    /* @ts-expect-error */
    globalThis.SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
  }
  break DEV;
}

export const PUBLIC_SUPABASE_URL = SUPABASE_URL;
export const PUBLIC_SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
