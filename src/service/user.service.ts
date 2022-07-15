import { AppDataSource } from "../main"
import { User } from "../entity/User"
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto"

@Injectable()
export class UserService {
    /**
     * User repository.
     */
    private userRepository = AppDataSource.getRepository(User);

    /**
     * Creates user with fields described in class CreateUserDto.
     * @param user - The user information.
    */
    async create(user: CreateUserDto) {
        user['hasSubscription'] = false;
        return await this.userRepository.save(user);
    }

    /**
     * Updates user information with fields described in class UpdateUserDto.
     * @param id - The id of user.
     * @param updatedUser - The changed user information.
    */
    async update(id: number, updatedUser: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ 
            id: id
        });
        if (user === null) {
            return `User ${id} is not exists.`;
        }
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.age = updatedUser.age;
        user.hasSubscription = updatedUser.hasSubscription;
        await this.userRepository.save(user);
        return `User ${id} successfully changed.`
    }

    /**
     * Removes user.
     * @param id - The id of user.
    */
    async remove(id: number) {
        const user = await this.userRepository.findOneBy({
            id: id
        });
        if (user === null) {
            return `User ${id} is not exists.`;
        }
        await this.userRepository.remove(user);
        return `User ${id} successfully removed.`;
    }

    /**
     * Gets names and lastnames of all users.
    */
    async getAll() {
        return await this.userRepository
            .createQueryBuilder("user")
            .select(["user.firstName", "user.lastName"])
            .getMany();
    }

    /**
     * Gets all information about user.
     * @param id - The id of user.
    */
    async getById(id: number) {
        return await this.userRepository.findOneBy({
            id: id
        });
    }

    /**
     * Checks if user has subscription.
     * @param id - The id of user.
    */
    async hasSubscription(id: number) {
        let user = await this.userRepository.findOneBy({
            id: id
        });
        if (user === null) {
            return `User ${id} is not exists.`;
        }
        return user.hasSubscription;
    }

    /**
     * Buys subscription for user if user has no subscription.
     * @param id - The id of user.
    */
    async buySubscription(id: number) {
        let user = await this.userRepository.findOneBy({
            id: id
        });
        if (user === null) {
            return `User ${id} is not exists.`;
        }
        if (user.hasSubscription) {
            return `User ${id} is already have subscription.`;
        }
        user.hasSubscription = true;
        await this.userRepository.save(user);
        return `User ${id} bought subscription successfuly.`;
    }

}