import UserModel from "@/db/models/user.schema";
import type { UserListRoute } from "./user.routes";
import { AppRouteHandler } from "@/lib/types";

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
    ctx.status(200)
    return ctx.json(result);
};