import { Button } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";
import Icon from "@/components/Icon.tsx";

export const BtcPrice = clientOnly(
  () => {
    const { data, refetch, isFetching } = useBtcPrice();

    return (
      <div className="flex flex-col-reverse gap-4 items-center justify-center h-full">
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
      </div>
    );
  },
  () => <Button disabled>JS required</Button>,
);
