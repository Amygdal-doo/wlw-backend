import createApp from '@/lib/create-app'
import configureOpenApi from '@/lib/configure-open-api'

import index from '@/routes/index.route'
import user from '@/routes/user/user.index'
import idea from '@/routes/idea/idea.index'

const app = createApp()

// 2 Way to do it
const routes = [
    index,
    user,
    idea
] as const; // this lets typescript know it wont change at runtime

// The OpenAPI documentation will be available at /doc
configureOpenApi(app)

// 1 Way to do it
//or another way is to chain this and export the _app
// const _app = app
//     .route('/api/', index)
//     .route('/api/', user)

// Every route will be available at /
routes.forEach((route) => {
    app.route('/api/',route)
})

// 2 Way to do it
// now all you have to do is import to the client side code 
export type AppType = typeof routes[number] // this will give type of everything at 'number' so [0],[1] etc.

// 1 Way to do it
// export _app as type
// export type AppType = typeof _app


export default app