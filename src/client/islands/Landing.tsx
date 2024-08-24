// islands are rendered on the server first, then again on the client if "hybrid".

import { BlogPost } from "@/components/BlogPost.tsx";
import { Tables } from "@/supabase/schema.gen.ts";
import { Message } from "@/server/layout/Message.tsx";
import { Link } from "@/components";

type LandingProps = {
  posts: Tables<"posts">[];
  single?: boolean;
};

export const Landing = ({ posts, single }: LandingProps) => {
  return (
    <>
      {posts.length
        ? (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.id}>
                <BlogPost post={post} detail={single} />
              </li>
            ))}
          </ul>
        )
        : <Message>No posts to show!</Message>}
      <p className="mt-4 text-right">
        <Link href="/blog/new">New post</Link>
      </p>
    </>
  );
};
