import type { AppRouteHandler } from '@/lib/types'
import type { CreateIdeaRoute, IdeaListRoute } from '../routes/idea.routes'
import * as userService from '@/modules/user/services/user.service'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import * as ideaService from '../services/idea.service'

export const IdeasListHandler: AppRouteHandler<IdeaListRoute> = async (ctx) => {
  const result = await ideaService.findAll()
  return ctx.json(result, HttpStatusCodes.OK)
}

export const createIdeaHandler: AppRouteHandler<CreateIdeaRoute> = async (ctx) => {
  const idea = ctx.req.valid('json')
  const user = await userService.findOne(idea.user.toString())
  if (!user) {
    return ctx.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND,
    )
  }
  const newIdea = await ideaService.create(idea)
  return ctx.json(newIdea, HttpStatusCodes.CREATED)
}
