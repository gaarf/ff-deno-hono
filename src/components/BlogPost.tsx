import { type Tables } from "@/supabase/schema.gen.ts";
import { TimeAgo } from "@/components/TimeAgo.tsx";
import { Link } from "@/components/intrinsic.ts";
import { Box } from "@/components";
import { BlogVotes } from "@/components/BlogVotes.tsx";

type BlogPostProps = {
  post: Tables<"posts">;
};

export const BlogPost = ({ post }: BlogPostProps) => (
  <article className="border rounded overflow-hidden">
    <Box className="border-b bg-accent-1 p-2 flex-col items-start md:flex-row md:items-end">
      <h2 className="font-extrabold text-xl">{post.title || `#${post.id}`}</h2>
      <address className="not-italic text-xs text-nowrap">
        <TimeAgo
          className="italic"
          when={post.created_at}
        />
        {", by "}
        <Link href="#">{post.author_id.split("-")[0]}</Link>
      </address>
    </Box>

    <blockquote className="p-2">{post.content}</blockquote>

    <BlogVotes postId={post.id} />
  </article>
);
