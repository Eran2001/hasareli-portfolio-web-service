import { z } from 'zod'

export const projectTypes = ['AI feature', 'Full web app', 'WordPress site', 'Just saying hi'] as const

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Add your name and a valid email so I can reply.'),
  email: z.string().trim().email('Add your name and a valid email so I can reply.'),
  message: z.string(),
  projectType: z.enum(projectTypes),
})

export type ContactInput = z.infer<typeof contactSchema>
