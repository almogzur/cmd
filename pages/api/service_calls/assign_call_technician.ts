// /api/service_calls/technician/update_call_technician.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import { z } from 'zod';

const UpdateTechnicianSchema = z.object({
  callId: z.string().min(1, 'Call ID is required'),
  technicianId: z.string().min(1, 'Technician ID is required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parsed = UpdateTechnicianSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { callId, technicianId } = parsed.data;

  try {
    // Make sure the chosen user exists and is a TECHNICIAN
    const tech = await prisma.user.findUnique({
      where: { id: technicianId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!tech) return res.status(404).json({ error: 'Technician not found' });

    if (tech.role !== 'TECHNICIAN' && tech.role !== 'ADMIN') {
      return res.status(400).json({ error: 'Selected user is not a TECHNICIAN' });
    }

    const updatedCall = await prisma.serviceCalls.update({
      where: { id: callId },
      data: {
        technicianId: tech.id,
        technicianName: tech.name ,
        technicianEmail: tech.email ,
      },
      include: {
        technician: true, // returns the related user (technician)
      },
    });

    return res.status(200).json({ success: true, updatedCall });
  } catch (error) {
    console.error('Error updating technician:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
