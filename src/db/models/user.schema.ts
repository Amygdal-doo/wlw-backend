import mongoose, { Schema, model } from 'mongoose';
import { z } from 'zod';

// 1. Create an interface representing a document in MongoDB.
// interface IUser {
//   username: string;
//   email: string;
//   password: string;
// }

export const userZodSchema = z.object({
    _id: z.string(),
    username: z.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(50, 'Username must be at most 50 characters long'),
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(50, 'Password must be at most 50 characters long'),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const createUserSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(50, 'Username must be at most 50 characters long'),
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(50, 'Password must be at most 50 characters long'),
});

export const patchUserSchema = createUserSchema
    .partial()

export const getOneUserParamSchema = z.object({
    id: z
        // .instanceof(mongoose.Types.ObjectId)
        .string()
        .min(24, 'Invalid ObjectId')
        .max(24, 'Invalid ObjectId')
        .transform((val) => new mongoose.Types.ObjectId(val))
        .openapi({
            param: {
                name: 'id',
                in: 'path',
            },
            // example: new mongoose.Types.ObjectId()
        })
});

// For TypeScript type inference
export type UserZodType = z.infer<typeof userZodSchema>;


// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<UserZodType>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},{ timestamps: true });

// 3. Create a Model.
const UserModel = model<UserZodType>('User', UserSchema);

export default UserModel