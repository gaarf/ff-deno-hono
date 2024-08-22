import { useMutation } from "@tanstack/react-query";
import supabase from "@/supabase/client.ts";
import { toast } from "@/utils.ts";

export const useVoteUpsert = (postId: number) =>
  useMutation({
    mutationKey: ["vote", postId],
    mutationFn: async (variables: { up: boolean }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await supabase
        .from("votes")
        .upsert({
          post_id: postId,
          user_id: session?.user.id,
          up: variables.up,
        })
        .throwOnError();
    },
    onError(err) {
      console.error(err);
      toast.error(`${err}`);
    }
  });
