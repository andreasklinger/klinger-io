import useSWR from 'swr';
import { fetchDatabase } from '../helpers/fetchDatabase';

export const useViews = (slug: string, defaultViews: number) => {
  const response = useSWR<number | null>(`/views/${slug}`, fetchDatabase, {
    fallbackData: defaultViews,
  });
  return response.data?.toLocaleString('en-US') || '0';
};
