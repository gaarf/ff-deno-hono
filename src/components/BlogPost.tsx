import { type Tables } from "@/supabase/schema.gen.ts";
import { TimeAgo } from "./TimeAgo.tsx";

type BlogPostProps = {
  post: Tables<"posts">;
};

export const BlogPost = ({ post }: BlogPostProps) => (
  <article className="flex flex-col items-start p-2 bg-neutral-2">
    {/* <h2>{post.title}</h2> */}
    <blockquote>{post.content}</blockquote>
    <address>{post.author_id}</address>
    <TimeAgo when={post.created_at} unit="days" />
  </article>
);
