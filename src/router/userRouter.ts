import express, { Router } from "express";
import { userController } from "../controller";

const userRouter = express.Router()

userRouter.post('/', userController.createUser)

export default userRouter;