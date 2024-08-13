import { useQuery, useQueryClient } from "@tanstack/react-query";
export { useQuery, useQueryClient };

function q<T>(url: RequestInfo) {
  return ({
    queryKey: [url.toString()],
    queryFn: () => fetch(url).then<T>((res) => res.json()),
  });
}

export const useBtcPrice = (enabled = true) => {
  return useQuery({
    ...q<{ data: unknown; renderedAt: string; }>("/api/btc"),
    enabled,
  });
};
