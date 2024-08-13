import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "@/supabase/schema.gen.ts";

declare global {
  const PUBLIC_SUPABASE_URL: string;
  const PUBLIC_SUPABASE_ANON_KEY: string;
}

export function createClient() {
  return createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

