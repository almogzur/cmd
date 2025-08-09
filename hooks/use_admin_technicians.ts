// hooks/useTechnicians.ts
import axios from 'axios';
import useSWR from 'swr';

export type Technician = {
  id: number;
  name: string;
  email: string;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useAdminTechnicians() {
  
  const { data, error, isLoading, mutate } = useSWR<Technician[]>('/api/admin/technician/list', fetcher);

  return {
    technicians: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
