import { rateLimitConfig } from "@/lib/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import HttpStatusCode from '@/lib/server_status_code'
import { prisma } from "@/prisma/prisma";

const apiLimiter = rateLimit(rateLimitConfig);

const phoneRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
);

const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3).max(30),
  phone:z.string().regex(phoneRegex,"Invalid phone number"),
  role: z.enum(['USER', 'TECHNICIAN'])
});

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Create new user'
    
    console.log(API_NAME + "call")

  if (req.method !== 'POST') { 
      return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
}

   const parseResult = createUserSchema.safeParse(req.body);

   if(!parseResult.success) {
    console.log(parseResult.error.issues )
    return res.status(400).json({ message: 'Invalid request body' });
   }
  
  
      const email = parseResult.data.email
      const name = parseResult.data.name
      const role = parseResult.data.role


     try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: role // if you use roles
      },
    });

    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('User creation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }


})
}

export const config = {
api: {
 externalResolver: true, 
}
}