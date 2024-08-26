import { Button, Icon } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";

export const BtcPrice = clientOnly(
  () => {
    const { data, refetch, isFetching } = useBtcPrice();

    return (
      <div className="flex-1 flex flex-col items-start">
        <Button onClick={() => refetch()} loading={isFetching}>
          <Icon.Bitcoin />
          Fetch price
        </Button>
        {data && (
          <div className="flex-1 flex items-center self-center">
            <p className="text-8xl text-accent-12">
              {data.bpi.USD.rate_float.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        )}
      </div>
    );
  },
  () => (
    <div>
      <Button disabled>JS required</Button>
    </div>
  )
);
