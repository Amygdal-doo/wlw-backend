import type { IdeaSchemaZod } from '@/modules/idea/schemaValidations/idea.schema'
import type { z } from 'zod'
import mongoose, { model, Schema } from 'mongoose'

// For TypeScript type inference
export type IdeaZodType = z.infer<typeof IdeaSchemaZod>

// 2. Create a Schema corresponding to the document interface.
const IdeaSchema = new Schema<IdeaZodType>({
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true })

// 3. Create a Model.
const IdeaModel = model<IdeaZodType>('Idea', IdeaSchema)

export default IdeaModel
