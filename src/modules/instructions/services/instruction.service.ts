import type { CreateInstructionsSchemaZodType } from '../validations/create-instructions.schema'
import InstructionModel from '../schemas/instruction.schema'

export async function findOne(userId: string) {
  const instruction = await InstructionModel.findOne({ userId })
  return instruction
}

export async function createOne(data: CreateInstructionsSchemaZodType, userId: string) {
  const newInstruction = await InstructionModel.create({ ...data, userId })
  return newInstruction
}

export async function updateOne(data: CreateInstructionsSchemaZodType, instructionId: string) {
  const updatedInstruction = await InstructionModel.findOneAndUpdate({ _id: instructionId }, data, { new: true })
  return updatedInstruction
}
