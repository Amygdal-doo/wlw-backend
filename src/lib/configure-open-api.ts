import { AppOpenAPI } from "./types"

import packageJSON from '../../package.json'
import { apiReference } from "@scalar/hono-api-reference"

export default function configureOpenApi(app: AppOpenAPI) {
// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
    openapi: packageJSON.version,
    info: {
      version: '1.0.0',
      title: 'WLW API',
    },
  })

  app.get(
    '/reference',
    apiReference({
        theme: 'deepSpace',
        layout: 'classic',
        defaultHttpClient: {
            targetKey: 'javascript',
            clientKey: 'fetch',
    },
      spec: {
        url: '/doc',
      },
    }),
  )
}