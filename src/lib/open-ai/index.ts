import type { MessageZodType } from '@/modules/chat/validations/messages.schema'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import env from '@/env'
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
})

export async function completion(msg: ChatCompletionMessageParam, msgs: ChatCompletionMessageParam[]) {
  const responses = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    // model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.That will brainstorm Ideas with user.' },
      ...msgs,
      msg,
    ],
  })

  const aiResponse = responses.choices[0].message

  return {
    content: aiResponse.content ?? '', // Ensure content is a string
    role: aiResponse.role ?? 'assistant', // Default role to assistant
  }
}
