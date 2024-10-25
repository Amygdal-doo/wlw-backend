import { z } from 'zod'
import { ChatSchemaZod } from '../schemas/chat.schema'

export const MessagePaginationSchemaZod = z.object({
  data: z.array(ChatSchemaZod),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    page: z.number(),
    pages: z.number(),
    hasNextPage: z.boolean(),
  }),
})

export type MessagePaginationSchemaZodType = z.infer<typeof MessagePaginationSchemaZod>
