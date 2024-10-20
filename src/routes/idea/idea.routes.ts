import { IdeaZodSchema } from "@/db/models/ideas.schema";
import { notFoundSchema } from "@/lib/constants";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags =  ['Idea']

export const ideasList = createRoute({
    path: '/idea',
    method: 'get',
    tags,
    summary: 'Ideas list',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(IdeaZodSchema
    ),'The ideas list',)
    }
})

export type IdeaListRoute = typeof ideasList;