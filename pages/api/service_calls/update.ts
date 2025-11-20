import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { ServiceCallStatus, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { TechnicianNote, TechnicianNotesSchema } from "@/runtime_types/main";

// Zod body schema
const BodySchema = z.object({
  id: z.string().min(1, "id is required"),
  location: z.string().optional(),
  status: z.enum(ServiceCallStatus).optional(),
  attachments: z.array(z.string()).optional(),
  newNote: z.string().trim().min(1).optional(), // append as structured note
}).refine(
  (v) => v.location !== undefined || v.status !== undefined || v.attachments !== undefined || v.newNote !== undefined,
  { message: "At least one field to update is required." }
);

// Type guards


export function parseTechnicianNotes(
  json: Prisma.JsonValue | null | undefined
): TechnicianNote[] {
  if (!json) return [];
  const parsed = TechnicianNotesSchema.safeParse(json);
  return parsed.success ? parsed.data : [];
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id || !session.user.role) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (session.user.role !== "ADMIN" && session.user.role !== "TECHNICIAN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
  }

  const { id, location, status, attachments, newNote } = parsed.data;

  // Read current notes once
  const current = await prisma.serviceCalls.findUnique({
    where: { id },
    select: { technicianNotes: true },
  });
  if (!current) return res.status(404).json({ error: "Service call not found" });

  const existingNotes = parseTechnicianNotes(current.technicianNotes);

  // Build update input (typed)
  const data: Prisma.ServiceCallsUpdateInput = {};

  if (location !== undefined) data.location = location;
  if (status !== undefined) data.status = status;
  if (attachments !== undefined) data.attachments = { set: attachments }; // scalar list requires { set: [] }

  if (newNote) {
    const entry: TechnicianNote = {
      id: randomUUID(),
      authorId: session.user.id,
      authorName: session.user.name ?? "Technician",
      text: newNote,
      createdAt: new Date().toISOString(),
    };
    const updatedNotes: TechnicianNote[] = [...existingNotes, entry];
    data.technicianNotes = updatedNotes as unknown as Prisma.InputJsonValue; // JSON field
  }

  try {
    const updated = await prisma.serviceCalls.update({
      where: { id },
      data,
    });
    return res.status(200).json(updated);
  } catch (err) {
    console.error("Update service call failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
