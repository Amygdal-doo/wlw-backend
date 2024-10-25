import type { AppRouteHandler } from '@/lib/types'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import type { ChatRouteType, ChatsHistoryRouteType, GetOneChatRouteType, SaveChatRouteType } from '../routes/chat.routes'
import type { RequestBodyChatZodType } from '../validations/messages.schema'
import { log } from 'node:console'
import { completion } from '@/lib/open-ai'
import * as chatService from '@/modules/chat/services/chat.service'
import * as instructionService from '@/modules/instructions/services/instruction.service'
import { getLoggedUser } from '@/modules/user/routes/user.routes'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const chatHandler: AppRouteHandler<ChatRouteType> = async (ctx) => {
  // const { id } = ctx.req.valid('param')
  let aiResponse
  const { message, messages } = ctx.req.valid('json')
  const loggedUser = ctx.get('user')

  const instructions = await instructionService.findOne(loggedUser.sub)

  const msgs = messages !== undefined ? messages : []
  const msg: ChatCompletionMessageParam = message

  if (instructions) {
    aiResponse = await completion(msg, msgs, instructions)
  }
  else {
    aiResponse = await completion(msg, msgs)
  }

  if (!aiResponse) {
    return ctx.json(
      {
        message: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    )
  }

  const responseBody: RequestBodyChatZodType = { message: aiResponse, messages: [...msgs, message, aiResponse] }

  return ctx.json(responseBody, HttpStatusCodes.OK)
}

export const saveChatHandler: AppRouteHandler<SaveChatRouteType> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const messages = ctx.req.valid('json')
  // save chat to db
  await chatService.saveChat(messages, loggedUser.sub)
  return ctx.json(
    {
      message: HttpStatusPhrases.OK,
    },
    HttpStatusCodes.OK,
  )
}

export const chatsHistoryHandler: AppRouteHandler<ChatsHistoryRouteType> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const result = await chatService.getChatHistory(loggedUser.sub)

  return ctx.json(result, HttpStatusCodes.OK)
}

export const getOneChatHandler: AppRouteHandler<GetOneChatRouteType> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const { id } = ctx.req.valid('param')
  const chat = await chatService.getOne(id.toString(), loggedUser.sub)

  if (!chat) {
    return ctx.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(chat, HttpStatusCodes.OK)
}
