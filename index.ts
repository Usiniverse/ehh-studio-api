import express, {Request, Response, NextFunction} from "express"
import indexRouter from "./src/router"
import cors from 'cors'
import bodyParser from 'body-parser'
import {database} from './shared/db.config'

const appServer = async () => {
    const app = express()

    // 추가 설정 필요
    app.use(
        cors({
            origin: true, // 출처 허용 옵션
            credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
        }),
    )
    
    try {
        await database.checkDatabaseStatus()
    } catch (err) {
        console.error(err)
        throw new Error(`Can not connect DATABASE`)
    }
    
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello World!')
    })
    
    app.use('/', indexRouter)
    
    app.listen(3000, () => {
        console.log(`
            #############################################
                🛡️ Server listening on port: 3000 🛡️
            #############################################  
        `);
    })
}

if (require.main === module) {
	appServer()
}

export { appServer }