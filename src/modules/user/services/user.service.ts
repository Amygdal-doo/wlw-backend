import type { CreateUserType } from '../schemaValidations/create-user.schema'
import type { UpdateUserType } from '../schemaValidations/patch-user.schema'
import UserModel from '../schemas/user.schema'

export async function findAll() {
  const users = await UserModel.find({})
  return users
}

export async function create(userData: CreateUserType) {
  const newUser = await UserModel.create(userData)
  return newUser
}

export async function findOne(id: string) {
  const user = await UserModel.findById(id)
  return user
}

export async function updateOne(id: string, userData: UpdateUserType) {
  const user = await UserModel.findByIdAndUpdate(id, userData, { new: true })
  return user
}

export async function deleteOne(id: string) {
  const user = await UserModel.findByIdAndDelete(id)
  return user
}
