import {Request,Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";
import { AuthObject } from "@clerk/express";


interface AuthenticatedRequest extends Request {
    auth?: AuthObject;
  }

export const isAuthenticated=(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{

    if(!req.auth?.userId){
        throw new UnauthorizedError("UnauthorizedError");
    }
    next();
}