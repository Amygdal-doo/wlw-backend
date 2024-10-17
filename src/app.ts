import createApp from '@/lib/create-app'
import configureOpenApi from '@/lib/configure-open-api'

import index from '@/routes/index.route'

const app = createApp()

const routes = [
    index
]

// The OpenAPI documentation will be available at /doc
configureOpenApi(app)

routes.forEach((route) => {
    app.route('/',route)
})

export default app