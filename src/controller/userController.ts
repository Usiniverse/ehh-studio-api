import express, { NextFunction, Request, Response } from 'express'
import { userService } from '../service';

export class UserController {
    public async createUser(req: Request, res: Response) {
        const result = await userService.createUser(req.body);

        return res.status(201).send(result)
    }

    public getUser(req: Request, res: Response) {
        return
    }

    public getUsers(req: Request, res: Response) {
        return
    }

    public updateUser(req: Request, res: Response) {
        return
    }

    public deleteUser(req: Request, res: Response) {
        return
    }
}