import { zId } from '@zodyac/zod-mongoose'
import { z } from 'zod'

export const InstructionSchemaZod = z.object({
  _id: z.string(),
  betterAnswers: z.string().max(1000),
  howToAnswer: z.string().max(1000),
  userId: zId('User'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type InstructionZodType = z.infer<typeof InstructionSchemaZod>
