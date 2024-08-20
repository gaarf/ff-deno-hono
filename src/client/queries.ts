import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ApiBtc } from "@/routes/api.tsx";
export { useQuery, useQueryClient };

function j<T>(url: string) {
  return {
    queryKey: [url],
    queryFn: () => fetch(url).then<T>((res) => res.json()),
  };
}

export const useBtcPrice = () =>
  useQuery({
    ...j<ApiBtc>("/api/btc"),
    enabled: false,
  });
