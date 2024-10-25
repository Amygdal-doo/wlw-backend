import type { MessagePaginationSchemaZodType } from '../validations/chat.pagination'
import type { MessageZodType } from '../validations/messages.schema'
import ChatModel from '../schemas/chat.schema'

export async function saveChat(messages: MessageZodType[], userId: string) {
  const chat = await ChatModel.create({ messages, userId })
  return chat
}
export async function getChatHistory(userId: string) {
  const chatHistory = await ChatModel
    .find({ userId })
    .sort('-createdAt')// maybe sort by updatedAt that way when chat is continued it will be at the bottom
    .select(['', '-__v']) // messeges are not being sent because it will only be slower to send
  return chatHistory
}

export async function getChatHistoryPaginated(userId: string, page: number = 1, limit: number = 10): Promise<MessagePaginationSchemaZodType> {
  const skip = (page - 1) * limit

  const chatHistory = await ChatModel
    .find({ userId })
    .sort('-createdAt') // Sort by most recent first; adjust if needed
    .select(['-__v']) // Exclude messages and __v field
    .limit(limit) // Limit the number of results per page
    .skip(skip) // Skip to the appropriate page

  // Optionally, you can also get the total count for frontend pagination
  const total = await ChatModel.countDocuments({ userId })
  const pages = Math.ceil(total / limit)

  return {
    data: chatHistory,
    pagination: {
      limit,
      page,
      total,
      pages,
      hasNextPage: page < total,
    },
  }
}

export async function getOne(id: string, userId: string) {
  const chat = await ChatModel.findOne({ _id: id, userId })
  return chat
}

export async function deleteOneByUser(chatId: string, userId: string) {
  const idea = await ChatModel.deleteOne({ _id: chatId, user: userId })
  return idea
}
