import { createRouter } from '@/lib/create-app'
import * as handlers from '@/modules/chat/handlers/chat.handler'
import * as routes from './chat.routes'

const router = createRouter()
  .openapi(routes.chat, handlers.chatHandler)

export default router
