import { getOneUserParamSchema, createUserSchema, userZodSchema, patchUserSchema } from "@/modules/user/schemas/user.schema";
import { notFoundSchema } from "@/lib/constants";
import { createRoute, z } from "@hono/zod-openapi";
import * as mongoose from "mongoose";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags =  ['User']

export const userList = createRoute({
    path: '/users',
    method: 'get',
    tags,
    summary: 'User list',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(userZodSchema
        //     z.object(
        //     {
        //     _id: z.string(), 
        //     username: z.string(),
        //     email: z.string().email(),
        //     password: z.string(),
        //     createdAt: z.string().date(),
        //     updatedAt: z.string().date()
        // }
        // )
    ),'The User list',)
    }
})

export const getOneUser = createRoute({
    path: '/users/{id}',
    method: 'get',
    tags,
    summary: 'Get User By Id',
    request: {
        params: getOneUserParamSchema
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            userZodSchema,
            'The Requested user',
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            // z.object({
            //     message: z.string()
            // })
            // .openapi({
            //     example: { message: 'User not found' }
            // }),
            notFoundSchema,
            'User not found',
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(getOneUserParamSchema),
            'Invalid Id error',
        )
    }
})

export const userCreate = createRoute({
    path: '/users',
    method: 'post',
    tags,
    summary: 'User Registration',
    request: {
        body: jsonContentRequired(
            createUserSchema, 
            'The User Registering Data'
        )
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(
            userZodSchema,
            'The Registered User',
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(createUserSchema),
            'The validation error(s)',
        )
    }
})

export const userUpdate = createRoute({
    path: '/users/{id}',
    method: 'patch',
    tags,
    summary: 'User Info Update',
    request: {
        params: getOneUserParamSchema,
        body: jsonContentRequired(
            patchUserSchema, 
            'The User updates'
        )
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            userZodSchema,
            'The updated User',
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
            [
                createErrorSchema(createUserSchema),
                createErrorSchema(getOneUserParamSchema)
            ],
            'The validation error(s)',
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'User not found',
        ),
        // [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        //     createErrorSchema(getOneUserParamSchema),
        //     'Invalid Id error',
        // )
    }
})

export const deleteOneUser = createRoute({
    path: '/users/{id}',
    method: 'delete',
    tags,
    summary: 'Delete User By Id',
    request: {
        params: getOneUserParamSchema
    },
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: 'User deleted',
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'User not found',
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(getOneUserParamSchema),
            'Invalid Id error',
        )
    }
})



export type UserListRoute = typeof userList;
export type UserCreateRoute = typeof userCreate;
export type UserGetOneRoute = typeof getOneUser
export type UserPatchRoute = typeof userUpdate
export type UserDeleteRoute = typeof deleteOneUser