import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  try {
    const allCalls = await prisma.serviceCalls.findMany({
      where: {
        NOT: {
          status: 'DONE',
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(allCalls);
  } catch (error) {
    console.error('Error fetching all service calls:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
