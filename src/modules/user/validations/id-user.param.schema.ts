import mongoose from 'mongoose'
import { z } from 'zod'

export const IdUserParamSchemaZod = z.object({
  id: z
  // .instanceof(mongoose.Types.ObjectId)
    .string()
    .min(24, 'Invalid ObjectId')
    .max(24, 'Invalid ObjectId')
    .transform(val => new mongoose.Types.ObjectId(val))
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      // example: new mongoose.Types.ObjectId()
    }),
})
