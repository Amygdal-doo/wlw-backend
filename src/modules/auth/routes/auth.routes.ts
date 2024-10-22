import { conflictSchema, notFoundSchema } from '@/lib/constants'
import { CreateUserSchemaZod } from '@/modules/user/validations/create-user.schema'
import { UserResponseSchemaZod } from '@/modules/user/validations/user.schema'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'

const tags = ['Auth']

export const register = createRoute({
  path: '/auth/register',
  method: 'post',
  tags,
  summary: 'User Registration',
  request: {
    body: jsonContentRequired(
      CreateUserSchemaZod,
      'The User Registering Data',
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      UserResponseSchemaZod,
      'The Registered User',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateUserSchemaZod),
      'The validation error(s)',
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      conflictSchema,
      'Username or email already exists',
    ),
  },
})

export type RegisterRouteType = typeof register
