import { Button, Json } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";

export const BtcPrice = clientOnly(
  () => {
    const { data, refetch, isFetching } = useBtcPrice(false);
    if (!data) {
      return (
        <Button onClick={() => refetch()} disabled={isFetching}>
          Fetch
        </Button>
      );
    } else {
      return <Json value={data} />;
    }
  },
  () => <Button disabled>JS required</Button>,
);
