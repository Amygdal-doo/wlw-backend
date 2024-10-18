import { Schema, model } from 'mongoose';
import { z } from 'zod';

// 1. Create an interface representing a document in MongoDB.
// interface IUser {
//   username: string;
//   email: string;
//   password: string;
// }

export const userZodSchema = z.object({
    _id: z.string(),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    createdAt: z.date(),
    updatedAt: z.date()
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