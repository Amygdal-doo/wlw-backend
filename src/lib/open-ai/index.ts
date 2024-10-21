import type { MessageZodType } from '@/modules/chat/schemaValidations/messages.schema'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import env from '@/env'
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
})

export async function completion(msg: ChatCompletionMessageParam, msgs: ChatCompletionMessageParam[]) {
  const responses = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.That will brainstorm Ideas with User.' },
      ...msgs,
      msg,
    ],
  })

  // console.log(responses.choices)

  // console.log(responses)

  return {
    content: responses.choices[0].message.content,
    role: responses.choices[0].message.role,
  }
}
