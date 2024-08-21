// islands are rendered on the server first, then on the client.

import { Json } from "@/components/Json.tsx";
import { Database } from "@/supabase/schema.gen.ts";

type LandingProps = {
  posts: Array<Database["public"]["Tables"]["posts"]["Row"]>;
};

export const Landing = ({ posts }: LandingProps) => {
  console.log('here', posts);

  return (
    <section>
      <Json value={posts} />
    </section>
  );
};
