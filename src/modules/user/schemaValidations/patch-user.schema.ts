import type { z } from 'zod'
import { CreateUserSchemaZod } from './create-user.schema'

export const PatchUserSchemaZod = CreateUserSchemaZod
  .partial()

export type UpdateUserType = z.infer<typeof PatchUserSchemaZod>
