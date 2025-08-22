import useSWR from 'swr';
import axios from 'axios';

import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useUserServiceCalls(userId: string | null | undefined) {

  const shouldFetch = typeof userId === 'string';

  const { data, error, isLoading, mutate } = useSWR<ServiceCalls[]>(
    shouldFetch ? `/api/user/service_calls/pull_by_user?userId=${userId}` : null,
    fetcher
  );

  return {
    serviceCalls: data,
    isLoading,
    isError: error,
    mutate
  };
}
