import { UserDTO } from "../dto/users/UserDTO"
import { CreateUserDTO } from "../dto/users/CreateUserDTO"

export interface IUserRepository {
    createUser<CreateUserDTO>(dto: CreateUserDTO):UserDTO
}

export class UserRepository implements IUserRepository {
    createUser<CreateUserDTO>(dto: CreateUserDTO): UserDTO {
        return
    }
}