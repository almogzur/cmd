import useSWR from 'swr';
import axios from 'axios';
import { ServiceCalls } from '@prisma/client';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useServiceCallById(id: string | null) {

  const { data, error, isLoading , mutate } = useSWR<ServiceCalls>(
      `/api/service_calls/by_id/${id}` ,
    fetcher
  );

  return {

    serviceCall: data,
    isLoading,
    isError: error,
    mutate
  };
}
