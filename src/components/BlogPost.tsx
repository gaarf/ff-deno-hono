import { type Tables } from "@/supabase/schema.gen.ts";
import { TimeAgo } from "@/components/TimeAgo.tsx";
import { Link } from "@/components/intrinsic.ts";
import { Box } from "@/components";
import { BlogVotes } from "@/components/BlogVotes.tsx";
import { useSsrContext } from "@/client/SsrContext.ts";

type BlogPostProps = {
  post: Tables<"posts">;
};

export const BlogPost = ({ post }: BlogPostProps) => {
  const { user } = useSsrContext();

  return (
    <article className="border rounded overflow-hidden">
      <Box className="border-b bg-accent-1 p-2 flex-col items-start md:flex-row md:items-end">
        <h2 className="font-extrabold text-xl">
          {post.title || `#${post.id}`}
        </h2>
        <address className="not-italic text-xs text-nowrap">
          <Link href={`/blog/post/${post.id}`}>
            <TimeAgo className="italic" when={post.created_at} />
          </Link>
          {", by "}
          <Link href={`/blog?by=${post.author_id}`}>
            {post.author_id === user?.id ? 'You' : post.author_id.split("-")[0]}
          </Link>
        </address>
      </Box>

      <blockquote className="p-2">{post.content}</blockquote>

      {user && <BlogVotes postId={post.id} />}
    </article>
  );
};
