// /pages/api/user/update_info.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // adjust the path if needed
import { prisma } from '@/prisma/prisma'; // adjust path to your prisma instance
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(5, 'Phone is required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const validated = schema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: validated.name,
        phone: validated.phone,
      },
    });

    return res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.flatten() });
    }

    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
