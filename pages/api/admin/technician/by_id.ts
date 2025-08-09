// pages/api/technicians/[id].ts
import { prisma } from '@/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { z } from 'zod';

// Zod schema to validate and transform ID to number
const idSchema = z.string().regex(/^\d+$/).transform(Number);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check session
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  // Validate ID
  const idResult = idSchema.safeParse(req.query.id);
  if (!idResult.success) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const id = idResult.data;

  try {
    const technician = await prisma.technician.findUnique({ where: { id } });
    if (!technician) return res.status(404).json({ error: 'Technician not found' });

    return res.status(200).json(technician);
  } catch (error) {
    console.error('Fetch technician failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
