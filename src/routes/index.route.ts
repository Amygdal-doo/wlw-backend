import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from 'stoker/http-status-codes'

const router = createRouter()
    .openapi(createRoute({
        method: 'get',
        path: '/',
        tags: ['Index'],
        summary: 'Index summary',
        responses: {
            [HttpStatusCodes.OK]: jsonContent(z.object({
                message: z.string()
            }),'WLW API INDEX',)
        }
    }),(c) =>{
        return c.json({ message: 'WLW API' }, HttpStatusCodes.OK)
    })

export default router