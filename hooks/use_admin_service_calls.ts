import useSWR from 'swr';
import axios from 'axios';

import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useAdminServiceCalls() {

  const { data, error, isLoading , mutate } = useSWR<ServiceCalls[]>(
  `/api/admin/service_calls/pull_all_calls` ,
    fetcher
  );

  return {
    serviceCalls: data,
    isLoading,
    isError: error,
    mutate
  };
}
