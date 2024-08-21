// islands are rendered on the server first, then on the client.

import { clientOnly } from "@/utils.ts";
import { usePosts } from "@/client/queries.ts";
import { Json } from "@/components/Json.tsx";
import Icon from "@/components/Icon.tsx";

export const Landing = clientOnly(
  () => {
    const { data, error, isLoading } = usePosts();

    if (isLoading) {
      return <Icon.Spinner />;
    }

    return (
      <section>
        <Json value={{ data, error }} />
      </section>
    );
  },
  () => {
    return <section>server rendered</section>;
  }
);
