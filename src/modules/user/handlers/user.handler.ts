import type { AppRouteHandler } from '@/lib/types'
import type { UserCreateRoute, UserDeleteRoute, UserGetOneRoute, UserListRoute, UserPatchRoute } from '../routes/user.routes'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import * as userService from '../services/user.service'

export const userList: AppRouteHandler<UserListRoute> = async (ctx) => {
  const result = await userService.findAll()
  return ctx.json(result, HttpStatusCodes.OK)
}

export const registerUser: AppRouteHandler<UserCreateRoute> = async (ctx) => {
  const user = ctx.req.valid('json')
  const result = await userService.create(user)
  // ctx.status(201)
  return ctx.json(result, HttpStatusCodes.CREATED)
}

export const getOneUser: AppRouteHandler<UserGetOneRoute> = async (ctx) => {
  const { id } = ctx.req.valid('param')
  const user = await userService.findOne(id.toString())

  if (!user) {
    return ctx.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(user, HttpStatusCodes.OK)
}

export const userUpdate: AppRouteHandler<UserPatchRoute> = async (ctx) => {
  const { id } = ctx.req.valid('param')
  const userPatch = ctx.req.valid('json')

  const result = await userService.updateOne(id.toString(), userPatch)

  if (!result) {
    return ctx.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.json(result, HttpStatusCodes.OK)
}

export const deleteOneUser: AppRouteHandler<UserDeleteRoute> = async (ctx) => {
  const { id } = ctx.req.valid('param')

  const deletedUser = await userService.deleteOne(id.toString())
  if (!deletedUser) {
    return ctx.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return ctx.body(null, HttpStatusCodes.NO_CONTENT)
}
