import { Request, Response } from "express";

abstract class BaseController {
    public async execute(req: Request, res: Response) {}
}

abstract class BaseAPIController {
    public async create(req: Request, res: Response) {}
    public async read(req: Request, res: Response) {}
    public async update(req: Request, res: Response) {}
    public async delete(req: Request, res: Response) {}
}

export default BaseController