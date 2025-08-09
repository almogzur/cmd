import { z } from 'zod';

export const newCallSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  location: z.string().min(1),
  description: z.string().min(5),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  note: z.string().optional().nullable(),
});


export type ServiceCallStatus = 'new' | 'open' | 'pending' | 'closed' | 'resolved';

export interface ServiceCall {
  id: number;
  title: string;
  description: string;
  customerName: string;
  location: string;
  status: ServiceCallStatus;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  priority: 'low' | 'medium' | 'high' | 'critical';
  attachments?: string[]; // list of file URLs
  userId: string;
}

export type NewCallData = z.infer<typeof newCallSchema>;