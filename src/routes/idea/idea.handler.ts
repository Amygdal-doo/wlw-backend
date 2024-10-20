import UserModel from "@/db/models/user.schema";
import type { IdeaListRoute } from "./idea.routes";
import { AppRouteHandler } from "@/lib/types";
import  * as HttpStatusCodes  from "stoker/http-status-codes";
import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import mongoose from "mongoose";
import IdeaModel, { IdeaZodType } from "@/db/models/ideas.schema";

export const IdeasList: AppRouteHandler<IdeaListRoute> = async (ctx) => {

    const idea = await IdeaModel.create({
        content: 'Nova ideja',
        user: '67139e193c763be29966465c'
    })
    console.log({idea: idea});
    
    const result = await IdeaModel.find({})
    console.log({result});
    // ctx.status(200)
    return ctx.json(result,HttpStatusCodes.OK);
};