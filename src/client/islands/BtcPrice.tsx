import { Button, Json } from "@/components";
import { useBtcPrice } from "@/client/queries.ts";
import { clientOnly } from "@/utils.ts";

export const BtcPrice = clientOnly(() => {
  const { data, refetch, fetchStatus } = useBtcPrice(false);
  if(!data && fetchStatus === 'idle') {
    return <Button onClick={() => refetch()}>Fetch</Button>;
  }
  else if(fetchStatus === 'fetching') {
    return <>Fetching...</>;
  }
  else {
    return <Json value={data} />
  }

});
