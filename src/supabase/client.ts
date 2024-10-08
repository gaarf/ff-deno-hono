import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "@/supabase/schema.gen.ts";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "@/supabase/env.ts";

export function createClient() {
  return createBrowserClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  );
}

export default createClient();
