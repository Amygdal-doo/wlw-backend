import createApp from '@/lib/create-app'
import configureOpenApi from '@/lib/configure-open-api'

import index from '@/routes/index.route'
import user from '@/routes/user/user.index'

const app = createApp()

const routes = [
    index,
    user
]

// The OpenAPI documentation will be available at /doc
configureOpenApi(app)

// Every route will be available at /
routes.forEach((route) => {
    app.route('/api/',route)
})

export default app