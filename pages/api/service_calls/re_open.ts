// /pages/api/calls/reopen.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

const ReopenSchema = z.object({
  id: z.string().min(1),          // service call id

});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parsed = ReopenSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { id, } = parsed.data;

  try {
    const call = await prisma.serviceCalls.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    if (call.status !== 'DONE') {
      return res.status(409).json({ error: 'Only DONE calls can be reopened' });
    }

    // (Optional) enforce roles:
    // const role = session.user.role;
    // if (role !== 'ADMIN' && role !== 'TECHNICIAN') {
    //   return res.status(403).json({ error: 'Forbidden' });
    // }

    const updated = await prisma.serviceCalls.update({
      where: { id },
      data: {
        status: 'NEW', 
        reopenedBy: session.user.name,
        reopenedById: session.user.id,
      },
    });

    return res.status(200).json({ success: true, call: updated });
  } catch (err) {
    console.error('Reopen Call Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
