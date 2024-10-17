import { OpenAPIHono } from '@hono/zod-openapi'
import { pinnoLogger } from '@/middlewares/loggers/pino-logger'
// import { logger } from 'hono/logger'

import { notFound, onError } from 'stoker/middlewares'
import { AppBindings } from './types'

export function createRouter() {
    return new OpenAPIHono<AppBindings>({ strict: false })
}


const app = createRouter()
export default function createApp() {
    const app = new OpenAPIHono<AppBindings>()
    app.use(pinnoLogger())

    app.notFound(notFound)
    app.onError(onError)

    return app
}

