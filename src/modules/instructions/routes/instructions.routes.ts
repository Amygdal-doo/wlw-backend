import { badRequestSchema, notFoundSchema, okSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { CreateInstructionsSchemaZod } from '../validations/create-instructions.schema'
import { InstructionSchemaZod } from '../validations/instruction.schema'

const tags = ['Instructions']

export const instructionUpdate = createRoute({
  path: '/instructions',
  method: 'patch',
  tags,
  summary: 'Update Logged Users Chat instructions',
  request: {
    // params: IdUserParamSchemaZod,
    body: jsonContentRequired(
      CreateInstructionsSchemaZod,
      'The User Caht instructions Data',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      okSchema,
      'The updated Instruction',
    ),
    // [HttpStatusCodes.BAD_REQUEST]: jsonContent(
    //   badRequestSchema,
    //   'When creating instruction fields cant be empty',
    // ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateInstructionsSchemaZod),
      'The validation error(s)',
    ),
  },
})

export const getInstruction = createRoute({
  path: '/instructions',
  method: 'get',
  tags,
  summary: 'Get User Instruction',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      InstructionSchemaZod,
      'The Requested user Instruction',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
  },
})

export type InstructionPatchRoute = typeof instructionUpdate

export type InstructionGetRoute = typeof getInstruction
