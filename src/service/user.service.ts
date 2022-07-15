import { AppDataSource } from "../main"
import { User } from "../entity/User"
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto"

@Injectable()
export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async create(user: CreateUserDto) {
        user['hasSubscription'] = false;
        return await this.userRepository.save(user);
    }

    async update(id: number, updatedUser: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ 
            id: id
        });
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.age = updatedUser.age;
        user.hasSubscription = updatedUser.hasSubscription;
        return await this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({
            id: id
        });
        return await this.userRepository.remove(user);
    }

    async getAll() {
        return await this.userRepository
            .createQueryBuilder("user")
            .select(["user.firstName", "user.lastName"])
            .getMany();
    }

    async getById(id: number) {
        return await this.userRepository.findOneBy({
            id: id
        });
    }

    async hasSubscription(id: number) {
        let user = await this.userRepository.findOneBy({
            id: id
        });
        return user.hasSubscription;
    }

    async buySubscription(id: number) {
        let user = await this.userRepository.findOneBy({
            id: id
        });
        if (user.hasSubscription) {
            return `User ${id} is already have subscription.`;
        }
        user.hasSubscription = true;
        await this.userRepository.save(user);
        return `User ${id} bought subscription successfuly.`;
    }

}