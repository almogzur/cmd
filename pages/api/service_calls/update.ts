import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]'; // adjust if needed
import { prisma } from '../../../prisma/prisma';
import { z } from 'zod';

// Zod schema
const updateCallSchema = z.object({
  id: z.string(),
  status: z.enum(['NEW', 'PENDING', 'IN_PROGRESS', 'DONE']),
  location: z.string().min(1),
  technicianNote: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = updateCallSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() });
  }

  const { id, status, location, technicianNote } = result.data;

  try {
    const updated = await prisma.serviceCalls.update({
      where: { id },
      data: {
        status,
        location,
        technicianNote,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
