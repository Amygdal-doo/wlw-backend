import { extendZod, zId } from '@zodyac/zod-mongoose'
import { z } from 'zod'

extendZod(z)

export const IdeaSchemaZod = z.object({
  _id: z.string(),
  content: z.string(),
  user: zId('User'),
  createdAt: z.date(),
  updatedAt: z.date(),
})
