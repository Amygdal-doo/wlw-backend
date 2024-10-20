import UserModel from "@/modules/user/schemas/user.schema";
import type { UserCreateRoute, UserDeleteRoute, UserGetOneRoute, UserListRoute, UserPatchRoute } from "../routes/user.routes";
import { AppRouteHandler } from "@/lib/types";
import  * as HttpStatusCodes  from "stoker/http-status-codes";
import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import mongoose from "mongoose";

export const userList: AppRouteHandler<UserListRoute> = async (ctx) => {
    // ctx.var.logger.info('test')
    // const user = await UserModel.create({
    //     email: 'test@test.com',
    //     username: 'test',
    //     password: 'test'
    // })
    // console.log({user});
    
    const result = await UserModel.find({})
    console.log({result});
    // ctx.status(200)
    return ctx.json(result,HttpStatusCodes.OK);
};

export const registerUser: AppRouteHandler<UserCreateRoute> = async (ctx) => {
    const user = ctx.req.valid('json')
    const result = await UserModel.create(user)
    // ctx.status(201)
    return ctx.json(result,HttpStatusCodes.CREATED);
}

export const getOneUser: AppRouteHandler<UserGetOneRoute> = async (ctx) => {    
    const { id } = ctx.req.valid('param')
    const user = await UserModel.findById(id)

    if(!user) return ctx.json(
        { 
            message: HttpStatusPhrases.NOT_FOUND 
        },
        HttpStatusCodes.NOT_FOUND
    );

    return ctx.json(user,HttpStatusCodes.OK);
};

export const userUpdate: AppRouteHandler<UserPatchRoute> = async (ctx) => {    
    const { id } = ctx.req.valid('param')
    const userPatch = ctx.req.valid('json')

    const result = await UserModel.findByIdAndUpdate(id,userPatch).setOptions({new: true})
    
    if(!result) return ctx.json(
        { 
            message: HttpStatusPhrases.NOT_FOUND 
        },
        HttpStatusCodes.NOT_FOUND
    );

    return ctx.json(result,HttpStatusCodes.OK);
};

export const deleteOneUser: AppRouteHandler<UserDeleteRoute> = async (ctx) => {
    const { id } = ctx.req.valid('param')
    
    const deletedUser = await UserModel.findByIdAndDelete(id)
    if(!deletedUser) return ctx.json(
        { 
            message: HttpStatusPhrases.NOT_FOUND 
        },
        HttpStatusCodes.NOT_FOUND
    );

    return ctx.body(null,HttpStatusCodes.NO_CONTENT);
}