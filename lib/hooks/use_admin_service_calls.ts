import useSWR from 'swr';
import axios from 'axios';

import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useAdminServiceCalls() {



  const { data, error, isLoading } = useSWR<ServiceCalls[]>(
  `/api/service-calls/pull_by_admin` ,
    fetcher
  );

  return {
    serviceCalls: data,
    isLoading,
    isError: error,
  };
}
