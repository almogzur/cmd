import useSWR from 'swr';
import axios from 'axios';
import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useTechnicianServiceCalls(id: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<ServiceCalls[]>(
    id ? `/api/technician/service_calls/pull_all_active_calls?id=${id}` : null,
    fetcher
  );

  return {
    serviceCalls: data,
    isLoading,
    isError: error,
    mutate,
  };
}