import { z } from 'zod'

export const MessageSchemaZod = z.object({
  role: z.string(),
  content: z.string(),
})

export const MessageArraySchemaZod = z.array(MessageSchemaZod)

export type MessageZodType = z.infer<typeof MessageSchemaZod>
export type MessagesArrayZodType = z.infer<typeof MessageArraySchemaZod>
