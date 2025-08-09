import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // Adjust if needed
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

// Zod validation schema
const UpdateTechnicianSchema = z.object({
  callId: z.string().min(1, 'Call ID is required'),
  technicianId: z.number().int().positive('Technician ID must be a positive integer'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parseResult = UpdateTechnicianSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.flatten().fieldErrors });
  }

  const { callId, technicianId } = parseResult.data;

  try {
    const updatedCall = await prisma.serviceCalls.update({
      where: { id: callId },
      data: { technicianId },
      include: {
        technician: true,
      },
    });

    return res.status(200).json({ success: true, updatedCall });
  } catch (error) {
    console.error('Error updating technician:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
