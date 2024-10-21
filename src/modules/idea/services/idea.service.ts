import type { CreateIdeaSchemaType } from '../validations/create-idea.schema'
import IdeaModel from '../schemas/ideas.schema'

export async function findAll() {
  const ideas = await IdeaModel.find({})
  return ideas
}

export async function findOne(id: string) {
  const idea = await IdeaModel.findById(id)
  return idea
}

export async function deleteOne(id: string) {
  const idea = await IdeaModel.findByIdAndDelete(id)
  return idea
}

export async function create(ideaData: CreateIdeaSchemaType) {
  const idea = await IdeaModel.create(ideaData)
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
