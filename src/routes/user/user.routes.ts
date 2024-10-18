import { userZodSchema } from "@/db/models/user.schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from "stoker/openapi/helpers";

const tags =  ['User']

export const userList = createRoute({
    path: '/users',
    method: 'get',
    tags,
    summary: 'User list',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(userZodSchema
        //     z.object(
        //     {
        //     _id: z.string(), 
        //     username: z.string(),
        //     email: z.string().email(),
        //     password: z.string(),
        //     createdAt: z.string().date(),
        //     updatedAt: z.string().date()
        // }
        // )
    ),'The User list',)
    }
})

export type UserListRoute = typeof userList;