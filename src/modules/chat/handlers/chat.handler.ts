import type { AppRouteHandler } from '@/lib/types'
import type { chat, ChatRouteType } from '../routes/chat.routes'
import type { MessageZodType } from '../schemaValidations/messages.schema'
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
  const message = ctx.req.valid('json')

  const defaultMessage: MessageZodType = {
    role: 'system',
    content: 'You are a helpful assistant.That will brainstorm Ideas with User.',
  }
  const toChatBot = [defaultMessage, ...message]

  const user = await userService.findOne(id.toString())
  if (!user) {
    return ctx.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(toChatBot, HttpStatusCodes.OK)
}
