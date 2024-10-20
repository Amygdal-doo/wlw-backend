import { createRouter } from "@/lib/create-app";
import * as handlers from "../handlers/idea.handler"
import * as routes from "./idea.routes"

const router = createRouter()
    .openapi(routes.ideasList, handlers.IdeasList)

export default router