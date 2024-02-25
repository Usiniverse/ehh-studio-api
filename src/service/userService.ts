import { CreateUserDTO } from "../dto/users/CreateUserDTO";
import { userRepository } from "../repository";
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    public async createUser(dto: CreateUserDTO) {
        try {
            dto.uid = uuidv4();
            const result = await userRepository.createUser(dto)
            return result;
        } catch(error) {
            console.error(error)
            throw error
        }
    }
}