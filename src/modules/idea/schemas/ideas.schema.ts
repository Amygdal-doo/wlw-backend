import mongoose, { Schema, model } from 'mongoose';
import { z } from 'zod';
import { extendZod, zId } from "@zodyac/zod-mongoose";

extendZod(z);

export const IdeaZodSchema = z.object({
    _id: z.string(),
    content: z.string(),
    user: zId("User"),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const createIdeaSchema = z.object({
    content: z.string(),
    user: zId("User"),
});


// For TypeScript type inference
export type IdeaZodType = z.infer<typeof IdeaZodSchema>;


// 2. Create a Schema corresponding to the document interface.
const IdeaSchema = new Schema<IdeaZodType>({
  content: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model
    required: true
  },
},{ timestamps: true });

// 3. Create a Model.
const IdeaModel = model<IdeaZodType>('Idea', IdeaSchema);

export default IdeaModel