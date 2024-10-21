import { notFoundSchema } from '@/lib/constants'
import { IdUserParamSchemaZod } from '@/modules/user/schemaValidations/id-user.param.schema'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { z } from 'zod'
import { MessageArraySchemaZod, MessageSchemaZod } from '../schemaValidations/messages.schema'

const tags = ['Chat']

export const chat = createRoute({
  path: '/chat/{id}',
  method: 'post',
  tags,
  summary: 'Brainstorming ideas with chatbot',
  request: {
    params: IdUserParamSchemaZod,
    body: jsonContentRequired(
      MessageArraySchemaZod,
      'The Message Data',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      MessageArraySchemaZod,
      'The updated Chat',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(MessageSchemaZod),
        createErrorSchema(IdUserParamSchemaZod),
      ],
      'The validation error(s)',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
  },
})

export type ChatRouteType = typeof chat
