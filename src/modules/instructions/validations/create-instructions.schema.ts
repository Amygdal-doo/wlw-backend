import type { z } from 'zod'
import { InstructionSchemaZod } from './instruction.schema'

export const CreateInstructionsSchemaZod = InstructionSchemaZod.partial().pick({
  howToAnswer: true,
  betterAnswers: true,
})

export type CreateInstructionsSchemaZodType = z.infer<typeof CreateInstructionsSchemaZod>

// z.object({
//     howToAnswer: z.string(),
//     betterAnswers: z.string(),
//     userId: zId('User'),
// })
