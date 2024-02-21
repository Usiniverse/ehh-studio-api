import express, {Request, Response, NextFunction} from "express"
import indexRouter from "./src/router"

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!')
})

app.use('/', indexRouter)

app.listen(3000, () => {
    console.log("hello world!");
})