import { Button, Icon } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";

export const BtcPrice = clientOnly(
  () => {
    const { data, refetch, isFetching } = useBtcPrice();

    return (
      <>
        <Button onClick={() => refetch()} loading={isFetching}>
          <Icon.Bitcoin />
          Fetch price
        </Button>
        {data && (
          <p className="text-5xl">
            {data.bpi.USD.rate_float.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
          </p>
        )}
      </>
    );
  },
  () => <Button disabled>JS required</Button>,
);
