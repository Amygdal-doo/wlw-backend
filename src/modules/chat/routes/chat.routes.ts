import { internalServerErrorSchema, notFoundSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { RequestBodyChatSchemaZod } from '../validations/messages.schema'

const tags = ['Chat']

export const chat = createRoute({
  path: '/chat',
  method: 'post',
  tags,
  summary: 'Brainstorming ideas with chatbot',
  request: {
    body: jsonContentRequired(
      RequestBodyChatSchemaZod,
      'The Message Data',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RequestBodyChatSchemaZod,
      'The updated Chat',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RequestBodyChatSchemaZod),
      'The validation error',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      'Ai response failed',
    ),
  },
})

export type ChatRouteType = typeof chat
