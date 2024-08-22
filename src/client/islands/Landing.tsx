// islands are rendered on the server first, then again on the client if "hybrid".

import { BlogPost } from "@/components/BlogPost.tsx";
import { Tables } from "@/supabase/schema.gen.ts";

type LandingProps = {
  posts: Tables<"posts">[];
};

export const Landing = ({ posts }: LandingProps) => {
  console.log("here", posts);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <BlogPost post={post} />
        </li>
      ))}
    </ul>
  );
};
