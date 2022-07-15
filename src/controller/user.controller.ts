import { Controller, Param, Get, Post, Put, Delete, Body } from "@nestjs/common";
import { UpdateDateColumn } from "typeorm";
import { User } from "../entity/User";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../service/user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    /**
     * Creates user with fields described in class CreateUserDto.
     * @param user - The user information.
    */
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    /**
     * Updates user information with fields described in class UpdateUserDto.
     * @param id - The id of user.
     * @param updatedUser - The changed user information.
    */
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    /**
     * Removes user.
     * @param id - The id of user.
    */
    @Delete(':id')
    async removeUser(@Param('id') id: number) {
        return await this.userService.remove(id);
    }

    /**
     * Checks if user has subscription.
     * @param id - The id of user.
    */
    @Get(':id/subscription')
    async hasSubscription(@Param('id') id: number) {
        return await this.userService.hasSubscription(id);
    }

    /**
     * Buys subscription for user if user has no subscription.
     * @param id - The id of user.
    */
    @Post(':id/subscription')
    async buySubscription(@Param('id') id: number) {
        return await this.userService.buySubscription(id);
    }

    /**
     * Gets names and lastnames of all users.
    */
    @Get()
    async getAllUsers() {
        return await this.userService.getAll();
    }

    /**
     * Gets all information about user.
     * @param id - The id of user.
    */
    @Get(':id')
    async getUser(@Param('id') id: number) {
        return await this.userService.getById(id);
    }

}