import { OpenAPIHono } from '@hono/zod-openapi'
import { pinnoLogger } from '@/middlewares/loggers/pino-logger'
import { defaultHook } from 'stoker/openapi'
// import { logger } from 'hono/logger'

import { notFound, onError } from 'stoker/middlewares'
import { AppBindings } from './types'

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    })
}


export default function createApp() {
    // const app = new OpenAPIHono<AppBindings>()
    const app = createRouter()
    app.use(pinnoLogger())

    app.notFound(notFound)
    app.onError(onError)

    return app
}

