import useSWR from 'swr';
import axios from 'axios';

import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useServiceCalls(userId: string | null | undefined) {

  const shouldFetch = typeof userId === 'string';

  const { data, error, isLoading } = useSWR<ServiceCalls[]>(
    shouldFetch ? `/api/service-calls/pull_by_user?userId=${userId}` : null,
    fetcher
  );

  return {
    serviceCalls: data,
    isLoading,
    isError: error,
  };
}
