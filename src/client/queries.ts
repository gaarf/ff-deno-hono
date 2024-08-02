import { useQuery, useQueryClient } from '@tanstack/react-query';
export { useQuery, useQueryClient };

export const useBtcPrice = (enabled = true) => {
  return useQuery({
    queryKey: ['/api/btc'],
    queryFn: () => fetch('/api/btc').then(res => res.json()),
    enabled
  });
}