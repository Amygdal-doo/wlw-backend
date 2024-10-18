import type { UserListRoute } from "./user.routes";
import { AppRouteHandler } from "@/lib/types";

export const userList: AppRouteHandler<UserListRoute> = (ctx) => {
    ctx.var.logger.info('test')
    ctx.status(200)
    return ctx.json([{ 
        email: 'test@test.com',
        username: 'test',
        password: 'test'
    }]);
};