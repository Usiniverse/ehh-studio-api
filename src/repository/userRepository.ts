import { User } from "../dto/users/User"
import { CreateUserDTO } from "../dto/users/CreateUserDTO"
import { pool } from "../../shared/db.config" 

export interface IUserRepository {
    createUser(dto: CreateUserDTO):Promise<User>
    // getUser(id: number): Promise<User>
}

export class UserRepository implements IUserRepository {
    public mapRowToUserDTO(row: any): User {   
		return {
			id: row.id,
            uid: row.uid,
			name: row.name,
			email: row.email,
			password: row.password,
            address: row.address,
            gender: row.gender,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}
	}

    public async createUser(dto: CreateUserDTO): Promise<User> {        
        const query = `INSERT INTO users (uid, name, email, password, address, gender) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [dto.uid, dto.name, dto.email, dto.password, dto.address, dto.gender]

        try {
            const execute = await new Promise<number>((resolve, reject) => {
                pool.query(query, values, (queryError, results) => {
                    if (queryError) {
                        console.error("Error occurred while executing query:", queryError);
                        reject(queryError);
                    } else {
                        // 쿼리가 성공적으로 실행되면 결과를 resolve 해준 후에 연결을 풀에 반환합니다.
                        resolve(results.insertId);
                        console.log(results.insertId);
                    }
                });
            });    
            
            const result = await new Promise<User>((resolve, reject) => {
                pool.query(`SELECT * FROM users WHERE id = ?`, [execute], (queryError, results) => {
                    if (queryError) {
                        console.error("Error occurred while executing query:", queryError);
                        reject(queryError)
                    } else {
                        resolve(this.mapRowToUserDTO(results[0]))
                    }
                })
            })

            console.log(result);

            return result
        } catch(error) {
            console.error(error);
            throw error 
        }
    }

    // getUser(id: number): Promise<User> {
    //     const query = `SELECT * FROM users WHERE id = ?`
    //     const value = [id]

    //     try {
    //         return new Promise
    //     } catch(error) {

    //     }
    // }
}