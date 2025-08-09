import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/prisma/prisma';
import {z} from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { id } = req.query;

const idSchema = z
  .string()



  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = idSchema.safeParse(id);

  if (!result.success) {
    const tree = z.treeifyError(result.error); // preferred new method
    return res.status(400).json({ error: tree });
  }


  try {
    const call = await prisma.serviceCalls.findUnique({
      where: { id: result.data },
    });

    if (!call) {
      return res.status(404).json({ error: 'Service call not found' });
    }

    return res.status(200).json(call);
    
  } catch (error) {
    console.error('Error fetching service call by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
