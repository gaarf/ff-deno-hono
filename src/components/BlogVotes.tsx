import { type Tables } from "@/supabase/schema.gen.ts";
import { clientOnly, cn, toast } from "@/utils.ts";
import { Button, ButtonGroup } from "@/components";
import { useVotes } from "@/client/queries.ts";
import { useVoteUpsert } from "@/client/mutations.ts";

type BlogVotesProps = {
  postId: Tables<"posts">["id"];
};

export const BlogVotes = clientOnly(({ postId }: BlogVotesProps) => {
  const { data, isFetching, refetch } = useVotes(postId);
  const { mutate, isPending } = useVoteUpsert(postId);
  const loading = isFetching || isPending;

  const [upCount = 0, downCount = 0, didVote] = data || [];

  const opts = {
    onSuccess() {
      refetch();
      toast.success("Your vote was recorded!");
    },
  };

  const voteDown = () => mutate({ up: false }, opts);
  const voteUp = () => mutate({ up: true }, opts);

  const didVoteDown = !!(didVote && !didVote.up);
  const didVoteUp = !!(didVote && didVote.up);

  const doubleVote = () => toast.warn("You already voted that way!");
  const disableKls = "cursor-not-allowed pointer-events-none text-opacity-50";

  return (
    <aside className="flex items-baseline gap-2 p-2 border-t">
      <ButtonGroup>
        <Button
          onClick={didVoteDown ? doubleVote : voteDown}
          loading={loading}
          title={didVoteDown ? "You voted Down" : "Vote Down"}
          className={cn({ [disableKls]: didVoteDown })}
        >
          ⬇️ {downCount?.toLocaleString()}
        </Button>
        <Button
          onClick={didVoteUp ? doubleVote : voteUp}
          loading={loading}
          title={didVoteUp ? "You voted Up" : "Vote Up"}
          className={cn({ [disableKls]: didVoteUp })}
        >
          ⬆️ {upCount?.toLocaleString()}
        </Button>
      </ButtonGroup>
    </aside>
  );
});
