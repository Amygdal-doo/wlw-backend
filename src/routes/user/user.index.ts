import { createRouter } from "@/lib/create-app";
import * as handlers from "./user.handler"
import * as routes from "./user.routes"

const router = createRouter()
    .openapi(routes.userList, handlers.userList)
    .openapi(routes.userCreate, handlers.registerUser)
    .openapi(routes.getOneUser, handlers.getOneUser)
    .openapi(routes.userUpdate, handlers.userUpdate)
    .openapi(routes.deleteOneUser, handlers.deleteOneUser)

export default router