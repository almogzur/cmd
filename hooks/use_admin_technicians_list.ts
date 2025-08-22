// hooks/useTechnicians.ts
import { User } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

export type TechnicianUser = Omit<User , 'createdAt'|'updatedAt' |'image'| 'emailVerified' >
;

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useAdminTechnicians() {
  
  const { data, error, isLoading, mutate } = useSWR<User[]>('/api/admin/technician/list', fetcher);

  return {
    technicians: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
