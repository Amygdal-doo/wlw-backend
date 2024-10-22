import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
export const conflictSchema = createMessageObjectSchema(HttpStatusPhrases.CONFLICT)
export const badRequestSchema = createMessageObjectSchema(HttpStatusPhrases.BAD_REQUEST)
export const unauthorizedSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED)
export const SaltRounds = 10
