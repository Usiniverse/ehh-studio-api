import { Router } from "express"
import userRouter from "./userRouter"

const indexRouter = Router()

// 회원 정보 및 관리
indexRouter.use('/users', userRouter)


export default indexRouter;