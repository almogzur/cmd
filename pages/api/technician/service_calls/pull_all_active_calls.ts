
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

const QuerySchema = z.object({
 id: z.string().min(1).optional(), // cuid() if you want stricter validation
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }


  console.log(req.query)
  
  const parse = QuerySchema.safeParse(req.query);

  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid query', details: parse.error});
  }

  try {
    // All NEW calls that are not yet assigned
    const newCalls = await prisma.serviceCalls.findMany({
      where: {
        status: 'NEW',             // ServiceCallStatus.NEW
        technicianId: null,        // only unassigned NEW calls
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calls assigned to the target technician
    const assignedCalls = await prisma.serviceCalls.findMany({
      where: {
        technicianId: session.user.id,
      },
      orderBy: { createdAt: 'desc' },

    });


    const result = [...newCalls, ...assignedCalls];
    

    return res.status(200).send(result);
  } catch (err) {
    console.error('Failed to fetch calls:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
