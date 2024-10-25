import { zId } from '@zodyac/zod-mongoose'
import mongoose, { model, Schema } from 'mongoose'
import { z } from 'zod'
import { MessageSchemaZod } from '../validations/messages.schema'

export enum MessageRoleEnum {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export type MessageZodType = z.infer<typeof MessageSchemaZod>

const MessageSchema = new Schema<MessageZodType>({
  role: {
    type: String,
    enum: MessageRoleEnum,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
})

export const ChatSchemaZod = z.object({
  _id: z.string().optional(),
  messages: z.array(MessageSchemaZod),
  userId: zId('User'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type ChatZodType = z.infer<typeof ChatSchemaZod>

const ChatSchema = new Schema<ChatZodType>({
  messages: [MessageSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

const ChatModel = model('Chat', ChatSchema)

export default ChatModel
