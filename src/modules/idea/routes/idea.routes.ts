import { notFoundSchema } from '@/lib/constants'
import { IdeaSchemaZod } from '@/modules/idea/validations/idea.schema'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { CreateIdeaSchemaZod } from '../validations/create-idea.schema'

const tags = ['Idea']

export const ideasList = createRoute({
  path: '/idea',
  method: 'get',
  tags,
  summary: 'Ideas list',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(IdeaSchemaZod,
    ), 'The ideas list'),
  },
})

export const createIdea = createRoute({
  path: '/idea',
  method: 'post',
  tags,
  summary: 'Save an idea',
  request: {
    body: jsonContentRequired(
      CreateIdeaSchemaZod,
      'The idea data',
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      IdeaSchemaZod,
      'The created idea',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdeaSchemaZod),
      'The validation error(s)',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
  },
})

export type IdeaListRoute = typeof ideasList
export type CreateIdeaRoute = typeof createIdea
