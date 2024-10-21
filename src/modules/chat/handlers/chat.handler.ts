import type { AppRouteHandler } from '@/lib/types'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import type { ChatRouteType } from '../routes/chat.routes'
import type { RequestBodyChatZodType } from '../validations/messages.schema'
import { completion } from '@/lib/open-ai'
import * as userService from '@/modules/user/services/user.service'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
// import * as ideaService from '../services/idea.service'

// export const IdeasListHandler: AppRouteHandler<IdeaListRoute> = async (ctx) => {
//   const result = await ideaService.findAll()
//   return ctx.json(result, HttpStatusCodes.OK)
// }

export const chatHandler: AppRouteHandler<ChatRouteType> = async (ctx) => {
  const { id } = ctx.req.valid('param')
  const { message, messages } = ctx.req.valid('json')

  const msgs: ChatCompletionMessageParam[] = messages !== undefined ? messages : []
  const msg: ChatCompletionMessageParam = message
  const aiResponse = await completion(msg, msgs)

  const responseBody: RequestBodyChatZodType = { message: aiResponse, messages: [...msgs, message, aiResponse] }

  const user = await userService.findOne(id.toString())
  if (!user) {
    return ctx.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(responseBody, HttpStatusCodes.OK)
}
