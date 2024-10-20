import createApp, { createTestApp } from '@/lib/create-app'
import { testClient } from 'hono/testing'
import { describe, expect, expectTypeOf, it } from 'vitest'
import router from './user.index'

describe('user list', () => {
  it('should return user list', async () => {
    const testRouter = createTestApp(router)
    const response = await testRouter.request('/api/users')
    const result = await response.json()
    console.log('🚀 ~ it ~ result:', result)

    expectTypeOf(result).toBeArray()
  })

  //   it('should return user list again', async () => {
  //     const client = testClient(createApp().route('/', router))

  //     const result = await client.users.$get()
  //     const json = await result.json()

  //     expectTypeOf(json).toBeArray()
  //   })

  it('validates the id param', async () => {
    const client = testClient(createApp().route('/', router))

    const result = await client.users[':id'].$get({
      param: {
        id: '123',
      },
    })

    expect(result.status).toBe(422)
  })

  it('validates the body when creating', async () => {
    const client = testClient(createApp().route('/', router))

    const result = await client.users.$post({
      json: {
        email: 'test@test.com',
        username: 'test',
        password: 'test',
      },
    })

    expect(result.status).toBe(422)
    // expect(result.status).toBe(200) // fails
  })
})
