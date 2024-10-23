import type { CreateIdeaSchemaType } from '../validations/create-idea.schema'
import IdeaModel from '../schemas/ideas.schema'

export async function findAll(user: string) {
  const ideas = await IdeaModel.find({ user })
  return ideas
}

export async function findOne(id: string) {
  const idea = await IdeaModel.findById(id)
  return idea
}

export async function getOneByUser(ideaId: string, userId: string) {
  return IdeaModel.findOne({ _id: ideaId, user: userId })
}

export async function deleteOne(id: string) {
  const idea = await IdeaModel.findByIdAndDelete(id)
  return idea
}

export async function deleteOneByUser(ideaId: string, userId: string) {
  const idea = await IdeaModel.deleteOne({ _id: ideaId, user: userId })
  return idea
}

export async function create(content: string, user: string) {
  const idea = await IdeaModel.create({
    content,
    user,
  })
  return idea
}

// export async function updateOne(id: string, ideaData: any) {
//   const idea = await IdeaModel.findByIdAndUpdate(id, ideaData, { new: true })
//   return idea
// }

export async function findAllByUser(userId: string) {
  const ideas = await IdeaModel.find({ user: userId })
  return ideas
}
