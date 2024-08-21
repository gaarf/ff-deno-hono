import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ApiBtc } from "@/routes/api.tsx";
import { createClient } from "@/supabase/client.ts";
export { useQuery, useQueryClient };

const supabase = createClient();

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    retry: false,
    queryFn: async () => {
      const { data } = await supabase.from("posts").select().throwOnError();
      return data;
    },
  });

function j<T>(url: string) {
  return {
    queryKey: [url],
    queryFn: () => fetch(url).then<T>((res) => res.json()),
  };
}

export const useBtcPrice = () =>
  useQuery({
    ...j<ApiBtc>("/api/btc"),
    enabled: false,
  });
