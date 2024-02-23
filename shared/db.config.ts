import * as dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config()

export const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: Number(process.env.MYSQL_PORT) || 3306,
	connectionLimit: 5
})

export class EHHStudioDatabase {
	private name: String
	constructor(name: String) {
		this.name = name
	}

	public async checkDatabaseStatus() {
		try {
			console.log("DB연결 시도 ::: checkDatabase");
			
			// 데이터베이스 연결 상태 확인
			pool.getConnection((err, connection) => {
				if (err) {
					console.error("Error occurred while connecting to database:", err);
				} else {
					console.log("Database connection successful!");
	
					// SELECT NOW() 쿼리 실행
					connection.query('SELECT NOW()', (queryError, results, fields) => {
						if (queryError) {
							console.error("Error occurred while executing query:", queryError);
						} else {
							console.log("DB connected ::: ", results[0]['NOW()']);
						}
						// 데이터베이스 연결 해제
						connection.release();
					});
				}
			});
		} catch (err) {
			console.error("Error occurred while checking database status:", err);
		}
	}
}

export const database = new EHHStudioDatabase("으헤헤 스튜디오 오픈!")