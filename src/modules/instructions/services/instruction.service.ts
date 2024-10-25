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
  // check if data.howToAnswer === '' set it to null likevise for betterAnswers
  const updatedInstruction = await InstructionModel
    .findOneAndUpdate({
      _id: instructionId,
    }, {
      howToAnswer: data.howToAnswer === '' ? null : data.howToAnswer,
      betterAnswers: data.betterAnswers === '' ? null : data.betterAnswers,
    }, { new: true })
  return updatedInstruction
}
