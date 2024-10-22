import type { AppRouteHandler } from '@/lib/types'
import type { UserCreateRoute } from '@/modules/user/routes/user.routes'
import type { CreateUserType } from '@/modules/user/validations/create-user.schema'
import type { UserResponseType } from '@/modules/user/validations/user.schema'
import type { RegisterRouteType } from '../routes/auth.routes'
import * as authService from '@/modules/auth/services/auth.service'
import * as userService from '@/modules/user/services/user.service'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const registerUser: AppRouteHandler<RegisterRouteType> = async (ctx) => {
  const user = ctx.req.valid('json')

  const emailExist = await userService.findOneByEmail(user.email)
  const usernameExist = await userService.findOneByUsername(user.username)
  if (emailExist || usernameExist) {
    return ctx.json(
      {
        message: HttpStatusPhrases.CONFLICT,
      },
      HttpStatusCodes.CONFLICT,
    )
  }

  const createUser: CreateUserType = {
    username: user.username,
    email: user.email,
    password: await authService.hashPassword(user.password),
  }

  const { password, ...newUser } = await userService.create(createUser)

  const result: UserResponseType = {
    ...newUser,
  }
  // ctx.status(201)
  return ctx.json(result, HttpStatusCodes.CREATED)
}
