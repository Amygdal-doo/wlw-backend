import { createRouter } from '@/lib/create-app'
import * as handlers from '../handlers/idea.handler'
import * as routes from './idea.routes'

const router = createRouter()
  .openapi(routes.createIdea, handlers.createIdeaHandler)
  .openapi(routes.ideaOne, handlers.getOneIdeaHandler)
  .openapi(routes.ideasList, handlers.IdeasListHandler)
  .openapi(routes.deleteOneIdea, handlers.deleteIdeaHandler)

export default router
