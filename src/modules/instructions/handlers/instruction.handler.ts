import type { AppRouteHandler } from '@/lib/types'
import type { InstructionGetRoute, InstructionPatchRoute } from '../routes/instructions.routes'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import * as instructionService from '../services/instruction.service'

export const InstructionUpdate: AppRouteHandler<InstructionPatchRoute> = async (ctx) => {
  // const { id } = ctx.req.valid('param')
  const patch = ctx.req.valid('json')
  const loggedUser = ctx.get('user')

  // let result

  const findExisting = await instructionService.findOne(loggedUser.sub)
  if (findExisting) {
    await instructionService.updateOne(patch, findExisting._id)
  }
  else {
    // if (patch.betterAnswers === '' || patch.howToAnswer === '') {
    //   return ctx.json(
    //     {
    //       message: HttpStatusPhrases.BAD_REQUEST,
    //     },
    //     HttpStatusCodes.BAD_REQUEST,
    //   )
    // }
    await instructionService.createOne(patch, loggedUser.sub)
  }

  return ctx.json(
    {
      message: HttpStatusPhrases.OK,
    },
    HttpStatusCodes.OK,
  )
}

export const getInstruction: AppRouteHandler<InstructionGetRoute> = async (ctx) => {
  const loggedUser = ctx.get('user')
  const instruction = await instructionService.findOne(loggedUser.sub)

  if (!instruction) {
    return ctx.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(instruction, HttpStatusCodes.OK)
}
