import { zId } from '@zodyac/zod-mongoose'
import { z } from 'zod'

export const CreateIdeaSchemaZod = z.object({
  content: z.string(),
  // user: zId('User'),
})

export type CreateIdeaSchemaType = z.infer<typeof CreateIdeaSchemaZod>
