import type { AppRouteHandler } from '@/lib/types'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import type { ChatRouteType } from '../routes/chat.routes'
import type { RequestBodyChatZodType } from '../validations/messages.schema'
import { completion } from '@/lib/open-ai'
import * as userService from '@/modules/user/services/user.service'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const chatHandler: AppRouteHandler<ChatRouteType> = async (ctx) => {
  // const { id } = ctx.req.valid('param')
  const { message, messages } = ctx.req.valid('json')

  const msgs = messages !== undefined ? messages : []
  const msg: ChatCompletionMessageParam = message

  const aiResponse = await completion(msg, msgs)
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
