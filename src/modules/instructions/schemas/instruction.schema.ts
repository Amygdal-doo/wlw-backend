import type { InstructionZodType } from '../validations/instruction.schema'
import mongoose, { model, Schema } from 'mongoose'

const InstructionSchema = new Schema<InstructionZodType>({
  howToAnswer: { type: String, required: false, unique: true, maxlength: 1000 },
  betterAnswers: { type: String, required: false, unique: true, maxlength: 1000 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

// 3. Create a Model.
const InstructionModel = model<InstructionZodType>('Instruction', InstructionSchema)

export default InstructionModel
