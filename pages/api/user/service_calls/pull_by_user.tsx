import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Zod schema for validating query
const QuerySchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate query with Zod
  const result = QuerySchema.safeParse(req.query);

if (!result.success) {
  const tree = z.treeifyError(result.error); // preferred new method
  return res.status(400).json({ error: tree });
}

  const { userId } = result.data;

  // Only allow access to own data unless ADMIN
  if (session.user.role !== 'USER' && session.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const serviceCalls = await prisma.serviceCalls.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(serviceCalls);
  } catch (error) {
    console.error('Error fetching service calls:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
