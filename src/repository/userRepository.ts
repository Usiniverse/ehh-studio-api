import { User } from "../dto/users/User"
import { CreateUserDTO } from "../dto/users/CreateUserDTO"
import { pool } from "../../shared/db.config" 

export interface IUserRepository {
    createUser(dto: CreateUserDTO):Promise<User>
}

export class UserRepository implements IUserRepository {
    createUser(dto: CreateUserDTO): Promise<User> {
        console.log("레포지토리 ::: ", dto);
        
        const query = `INSERT INTO users (uid, name, email, password, address, gender) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [dto.uid, dto.name, dto.email, dto.password, dto.address, dto.gender]

        try {
            return new Promise((resolve, reject) => {
                pool.query(query, values, (queryError, results) => {
                    if (queryError) {
                        console.error("Error occurred while executing query:", queryError);
                        reject(queryError);
                    } else {
                        // 쿼리가 성공적으로 실행되면 결과를 resolve 해준 후에 연결을 풀에 반환합니다.
                        resolve(results);
                    }
                });
            });
        } catch(error) {
            console.error(error);
            throw error 
        }

        return
    }
}