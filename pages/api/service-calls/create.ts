import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      title,
      description,
      customerName,
      location,
      priority,
      attachments,
      userId,
    } = req.body;

    // Validate required fields
    if (!title || !description || !customerName || !location || !priority || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCall = await prisma.serviceCalls.create({
      data: {
        title,
        description,
        customerName,
        location,
        priority,
        attachments,
        userId, // ✅ fix: required due to the relation in Prisma
      },
    });

    return res.status(201).json({ success: true, call: newCall });
  } catch (error) {
    console.error('Create Service Call Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
