import { notFoundSchema } from '@/lib/constants'
import { UserZodSchemaZod } from '@/modules/user/schemaValidations/user.schema'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { CreateUserSchemaZod } from '../schemaValidations/create-user.schema'
import { IdUserParamSchemaZod } from '../schemaValidations/id-user.param.schema'
import { PatchUserSchemaZod } from '../schemaValidations/patch-user.schema'

const tags = ['User']

export const userList = createRoute({
  path: '/users',
  method: 'get',
  tags,
  summary: 'User list',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(UserZodSchemaZod),
      'The User list',
    ),
  },
})

export const getOneUser = createRoute({
  path: '/users/{id}',
  method: 'get',
  tags,
  summary: 'Get User By Id',
  request: {
    params: IdUserParamSchemaZod,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserZodSchemaZod,
      'The Requested user',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUserParamSchemaZod),
      'Invalid Id error',
    ),
  },
})

export const userCreate = createRoute({
  path: '/users',
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
      UserZodSchemaZod,
      'The Registered User',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateUserSchemaZod),
      'The validation error(s)',
    ),
  },
})

export const userUpdate = createRoute({
  path: '/users/{id}',
  method: 'patch',
  tags,
  summary: 'User Info Update',
  request: {
    params: IdUserParamSchemaZod,
    body: jsonContentRequired(
      PatchUserSchemaZod,
      'The User updates',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserZodSchemaZod,
      'The updated User',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(CreateUserSchemaZod),
        createErrorSchema(IdUserParamSchemaZod),
      ],
      'The validation error(s)',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    // [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
    //     createErrorSchema(getOneUserParamSchema),
    //     'Invalid Id error',
    // )
  },
})

export const deleteOneUser = createRoute({
  path: '/users/{id}',
  method: 'delete',
  tags,
  summary: 'Delete User By Id',
  request: {
    params: IdUserParamSchemaZod,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'User deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUserParamSchemaZod),
      'Invalid Id error',
    ),
  },
})

export type UserListRoute = typeof userList
export type UserCreateRoute = typeof userCreate
export type UserGetOneRoute = typeof getOneUser
export type UserPatchRoute = typeof userUpdate
export type UserDeleteRoute = typeof deleteOneUser
