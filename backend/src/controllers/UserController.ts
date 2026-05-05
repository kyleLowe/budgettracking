import { NextFunction, Request, Response } from 'express';

export const getAuthenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}