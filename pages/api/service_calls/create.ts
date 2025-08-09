import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

// Zod schema
const ServiceCallSchema = z.object({
  id: z.string().min(12),
  description: z.string().min(1),
  customerName: z.string().min(1),
  location: z.string().min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH',"CRITICAL"]), // adjust to your enum
  attachments: z.array(z.string()).optional(), // assuming it's an array of file URLs/IDs
  userId: z.cuid(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = ServiceCallSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: z.treeifyError(result.error) });
  }

  const { id, description, customerName, location, priority, attachments, userId } = result.data;

  try {
    const newCall = await prisma.serviceCalls.create({
      data: {
        id,
        description,
        customerName,
        location,
        priority,
        attachments,
        userId,
      },
    });

    return res.status(201).json({ success: true, call: newCall });
  } catch (error) {
    console.error('Create Service Call Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
