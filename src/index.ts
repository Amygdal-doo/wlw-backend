import { serve } from '@hono/node-server'
import app from './app'
import env from './env'
import connect from '@/db/index'

const port = Number(env.PORT) || 3000
console.log(`Server is running on port http://localhost:${port}`)

connect()

serve({
  fetch: app.fetch,
  port
})