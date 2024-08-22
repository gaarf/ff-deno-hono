import { type Tables } from "@/supabase/schema.gen.ts";
import { TimeAgo } from "@/components/TimeAgo.tsx";
import { Link } from "@/components/intrinsic.ts";
import { Box } from "@/components";

type BlogPostProps = {
  post: Tables<"posts">;
};

export const BlogPost = ({ post }: BlogPostProps) => (
  <article className="bg-neutral-2 border rounded">
    <Box className="border-b p-2 flex-col items-start md:flex-row md:items-end">
      <h2 className="font-extrabold text-xl">{post.title}</h2>
      <address className="not-italic text-xs text-nowrap">
        <TimeAgo
          className="italic"
          when={post.created_at}
          unit="days"
          options={{ maximumFractionDigits: 0 }}
        />
        {", by "}
        <Link href="#">{post.author_id.split("-")[0]}</Link>
      </address>
    </Box>

    <blockquote className="p-2">{post.content}</blockquote>
  </article>
);
