import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const newCallSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  location: z.string().min(1),
  description: z.string().min(5),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  note: z.string().optional().nullable(),
});



export const TechnicianNoteSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  text: z.string(),
  createdAt: z.string(),
});


export function parseTechnicianNotes(
  json: Prisma.JsonValue | null | undefined
): TechnicianNote[] {
  if (!json) return [];
  const parsed = TechnicianNotesSchema.safeParse(json);
  return parsed.success ? parsed.data : [];
}



export type TechnicianNote = z.infer<typeof TechnicianNoteSchema>;
export const TechnicianNotesSchema = z.array(TechnicianNoteSchema);

export type NewCallData = z.infer<typeof newCallSchema>;