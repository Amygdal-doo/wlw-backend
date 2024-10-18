import { createRouter } from "@/lib/create-app";
import * as handlers from "./user.handler"
import * as routes from "./user.routes"

const router = createRouter()
    .openapi(routes.userList, handlers.userList)

export default router