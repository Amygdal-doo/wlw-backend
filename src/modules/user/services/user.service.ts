import type { CreateUserType } from '../validations/create-user.schema'
import type { UpdateUserType } from '../validations/patch-user.schema'
import UserModel from '../schemas/user.schema'

export async function findAll() {
  const users = await UserModel.find({})
  return users
}

export async function create(userData: CreateUserType) {
  const user = await UserModel.create(userData)
  return user
}

export async function findOneByUsername(username: string) {
  const user = await UserModel.findOne({ username })
  return user
}

export async function findOneByEmail(email: string) {
  const user = await UserModel.findOne({ email })
  return user
}

export async function findOne(id: string) {
  const user = await UserModel.findById(id).select('-password')
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
