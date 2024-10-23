import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import { z } from 'zod'

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
export const conflictSchema = createMessageObjectSchema(HttpStatusPhrases.CONFLICT)
export const badRequestSchema = createMessageObjectSchema(HttpStatusPhrases.BAD_REQUEST)
export const unauthorizedSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED)
export const forbiddenSchema = createMessageObjectSchema(HttpStatusPhrases.FORBIDDEN)
export const SaltRounds = 10

export const authorizationHeaderZodSchema = z.object({ Authorization: z.string() })
