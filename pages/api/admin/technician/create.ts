// pages/api/technicians/create.ts
import { prisma } from '@/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { z } from 'zod';

// Zod schema for creating a technician
const technicianSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check session
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validate body
  const result = technicianSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const { name, email } = result.data;

  try {
    const technician = await prisma.technician.create({
      data: { name, email },
    });
    return res.status(201).json(technician);
  } catch (error) {
    console.error('Create technician failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
