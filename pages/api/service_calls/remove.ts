import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

// Zod schema to validate ID
const DeleteCallSchema = z.object({
  id: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parseResult = DeleteCallSchema.safeParse(req.query);

  if (!parseResult.success) {
    return res.status(400).json({ error: z.treeifyError(parseResult.error) });
  }

  const { id } = parseResult.data;

  try {
    const call = await prisma.serviceCalls.findUnique({
      where: { id },
    });

    if (!call) {
      return res.status(404).json({ error: 'Service call not found' });
    }

    // Optional: Check if user is the creator (authorization layer)
    if (call.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await prisma.serviceCalls.delete({
      where: { id },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete Service Call Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
