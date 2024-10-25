import { IdParamSchemaZod, internalServerErrorSchema, notFoundSchema, okSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { ChatSchemaZod } from '../schemas/chat.schema'
import { MessageArraySchemaZod, RequestBodyChatSchemaZod } from '../validations/messages.schema'

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
    // [HttpStatusCodes.NOT_FOUND]: jsonContent(
    //   notFoundSchema,
    //   'User not found',
    // ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      'Ai response failed',
    ),
  },
})

export const saveChat = createRoute({
  path: '/chat/save',
  method: 'post',
  tags,
  summary: 'save the whole chat to db',
  request: {
    body: jsonContentRequired(
      MessageArraySchemaZod,
      'The chat data',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      okSchema,
      'Ok response message',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(MessageArraySchemaZod),
      'The validation error',
    ),
  },
})

export const chatsHistory = createRoute({
  path: '/chat/history',
  method: 'get',
  tags,
  summary: 'Chats History',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(MessageArraySchemaZod, 'The Chats History'),
  },
})

export const getOneChat = createRoute({
  path: '/chat/one/{id}',
  method: 'get',
  tags,
  summary: 'Get User Chat By Id',
  request: {
    params: IdParamSchemaZod,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      ChatSchemaZod,
      'The Requested Chat',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Chat not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamSchemaZod),
      'Invalid Id error',
    ),
  },
})

export const deleteOneChat = createRoute({
  path: '/chat/{id}',
  method: 'delete',
  tags,
  summary: 'Delete chat By Id',
  request: {
    params: IdParamSchemaZod,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Chat deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Chat not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamSchemaZod),
      'Invalid Id error',
    ),
  },
})

export type ChatRouteType = typeof chat
export type SaveChatRouteType = typeof saveChat
export type ChatsHistoryRouteType = typeof chatsHistory
export type GetOneChatRouteType = typeof getOneChat
export type DeleteOneChatRouteType = typeof deleteOneChat
