import { Button, Json } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";
import Icon from "@/components/Icon.tsx";

export const BtcPrice = clientOnly(
  () => {
    const { data, refetch, isFetching } = useBtcPrice(false);
    if (!data) {
      return (
        <Button onClick={() => refetch()} disabled={isFetching}>
          Fetch <Icon.Bitcoin />
        </Button>
      );
    } else {
      return <Json value={data} />;
    }
  },
  () => <Button disabled>JS required</Button>,
);
