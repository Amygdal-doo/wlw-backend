import { z } from 'zod'
import { MessageRoleEnum } from '../schemas/chat.schema'

export const MessageSchemaZod = z.object({
  role: z.enum(['user', 'assistant', 'system']).default('user'),
  content: z.string(),
  name: z.string().optional(),
})

export const MessageArraySchemaZod = z.array(MessageSchemaZod)

export const RequestBodyChatSchemaZod = z.object({
  messages: MessageArraySchemaZod.optional(),
  message: MessageSchemaZod,
})

export type MessageZodType = z.infer<typeof MessageSchemaZod>
export type MessagesArrayZodType = z.infer<typeof MessageArraySchemaZod>
export type RequestBodyChatZodType = z.infer<typeof RequestBodyChatSchemaZod>
