import { type Tables } from "@/supabase/schema.gen.ts";
import { TimeAgo } from "@/components/TimeAgo.tsx";
import { Link } from "@/components/intrinsic.ts";
import { Box } from "@/components";
import { BlogVotes } from "@/components/BlogVotes.tsx";
import { useSsrContext } from "@/client/SsrContext.ts";
import { PropsWithChildren } from "@/react.shim.ts";
import { cn } from "@/utils.ts";
import { Markdown } from "@/components/Markdown.tsx";

type BlogPostProps = {
  post: Tables<"posts">;
  detail?: boolean;
};

const LinkOrSpan = ({
  post,
  detail,
  children,
}: PropsWithChildren<BlogPostProps>) =>
  detail ? (
    <span>{children}</span>
  ) : (
    <Link href={`/blog/post/${post.id}`}>{children}</Link>
  );

export const Gradient = () => {
  return (
    <div className="absolute inset-0 top-20 bg-gradient-to-b from-transparent to-default-bg pointer-events-none" />
  );
};

export const BlogPost = (props: BlogPostProps) => {
  const { post, detail } = props;
  const { user } = useSsrContext();

  return (
    <article
      className={cn("border rounded overflow-hidden relative", {
        "max-h-40": !detail,
      })}
    >
      <Box className="border-b bg-accent-1 p-2 flex-col items-start md:flex-row md:items-end">
        <h2 className="font-extrabold text-xl">
          <LinkOrSpan {...props}>{post.title || `#${post.id}`}</LinkOrSpan>
        </h2>
        <address className="not-italic text-xs text-nowrap">
          <LinkOrSpan {...props}>
            <TimeAgo className="italic" when={post.created_at} />
          </LinkOrSpan>
          {" by "}
          <Link href={`/blog?by=${post.author_id}`}>
            {post.author_id === user?.id ? "You" : post.author_id.split("-")[0]}
          </Link>
        </address>
      </Box>

      <Markdown className="p-2">{post.content}</Markdown>

      {detail ? user && <BlogVotes postId={post.id} /> : <Gradient />}
    </article>
  );
};
