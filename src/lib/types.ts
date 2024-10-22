import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { JwtVariables } from 'hono/jwt'
import type { PinoLogger } from 'hono-pino'

export interface IJwtpayload {
  sub: string
  username: string
  email: string
  exp: number
  [key: string]: any
}

type Variables = JwtVariables<IJwtpayload>
export interface AppBindings {
  Variables: {
    logger: PinoLogger
    variables: Variables
    message: string
  }
  JwtPayload: IJwtpayload

}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
