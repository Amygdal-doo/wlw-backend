import type { AppRouteHandler } from '@/lib/types'
import type { CreateIdeaRoute, DeleteIdeaRoute, IdeaListRoute, IdeaRoute } from '../routes/idea.routes'
import * as userService from '@/modules/user/services/user.service'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import * as ideaService from '../services/idea.service'

export const IdeasListHandler: AppRouteHandler<IdeaListRoute> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const result = await ideaService.findAll(loggedUser.sub)
  return ctx.json(result, HttpStatusCodes.OK)
}

export const createIdeaHandler: AppRouteHandler<CreateIdeaRoute> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const idea = ctx.req.valid('json')

  const newIdea = await ideaService.create(idea.content, loggedUser.sub)
  return ctx.json(newIdea, HttpStatusCodes.CREATED)
}

export const getOneIdeaHandler: AppRouteHandler<IdeaRoute> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const { id } = ctx.req.valid('param')
  const idea = await ideaService.getOneByUser(id.toString(), loggedUser.sub)
  if (!idea) {
    return ctx.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND,
    )
  }
  return ctx.json(idea, HttpStatusCodes.OK)
}

export const deleteIdeaHandler: AppRouteHandler<DeleteIdeaRoute> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const { id } = ctx.req.valid('param')
  const deletedIdea = await ideaService.deleteOneByUser(id.toString(), loggedUser.sub)
  if (!deletedIdea) {
    return ctx.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND,
    )
  }
  return ctx.body(null, HttpStatusCodes.NO_CONTENT)
}
