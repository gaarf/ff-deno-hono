import { type Tables } from "@/supabase/schema.gen.ts";
import { clientOnly } from "@/utils.ts";
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
    },
  };
  const voteUp = () => mutate({ up: true }, opts);
  const voteDown = () => mutate({ up: false }, opts);

  return (
    <aside className="flex items-baseline gap-2 p-2 pt-0">
      <ButtonGroup>
        <Button
          disabled={!!(didVote && !didVote.up)}
          onClick={voteDown}
          loading={loading}
          title="Vote DOWN"
        >
          ⬇️ {downCount}
        </Button>
        <Button
          disabled={!!(didVote && didVote.up)}
          onClick={voteUp}
          loading={loading}
          title="Vote UP"
        >
          ⬆️ {upCount}
        </Button>
      </ButtonGroup>
    </aside>
  );
});
