import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

const CloseCallSchema = z.object({
  id: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parsed = CloseCallSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { id } = parsed.data;

  try {
    const updatedCall = await prisma.serviceCalls.update({
      where: { id },
      data: {
        status: 'DONE',
        closerId: session.user.id,   
        closerName: session.user.name,
      },
    });

    return res.status(200).json({ success: true, call: updatedCall });
  } catch (error) {
    console.error('Close Call Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
