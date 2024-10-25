import { createRouter } from '@/lib/create-app'
import * as handlers from '../handlers/instruction.handler'
import * as routes from './instructions.routes'

const router = createRouter()
  .openapi(routes.instructionUpdate, handlers.InstructionUpdate)
  .openapi(routes.getInstruction, handlers.getInstruction)

export default router
