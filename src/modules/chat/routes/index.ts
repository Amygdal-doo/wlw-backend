import { createRouter } from '@/lib/create-app'
import * as handlers from '@/modules/chat/handlers/chat.handler'
import * as routes from './chat.routes'

const router = createRouter()
  .openapi(routes.chat, handlers.chatHandler)
  .openapi(routes.saveChat, handlers.saveChatHandler)
  .openapi(routes.chatsHistory, handlers.chatsHistoryHandler)
  .openapi(routes.getOneChat, handlers.getOneChatHandler)
  .openapi(routes.deleteOneChat, handlers.deleteChatHandler)

export default router
