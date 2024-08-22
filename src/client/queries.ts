import { useQuery } from "@tanstack/react-query";
import { type ApiBtc } from "@/routes/api.tsx";
import supabase from "@/supabase/client.ts";

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    retry: false,
    queryFn: async () => {
      const { data } = await supabase.from("posts").select().throwOnError();
      return data;
    },
  });

export const useVotes = (postId: number) =>
  useQuery({
    queryKey: ["votes", postId],
    retry: false,
    queryFn: async () => {
      const [
        {
          data: { user },
        },
        { count: upvotes },
        { count: downvotes },
      ] = await Promise.all([
        supabase.auth.getUser(),
        ...[true, false].map((up) =>
          supabase
            .from("votes")
            .select("up", { count: "exact", head: true })
            .eq("up", up)
            .eq("post_id", postId)
            .throwOnError()
        ),
      ]);
      let userVote = null;
      if (user) {
        const { data } = await supabase
          .from("votes")
          .select("up")
          .eq("user_id", user.id)
          .maybeSingle();
        userVote = data;
      }
      return [upvotes, downvotes, userVote] as const;
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
