import { Controller, Param, Get, Post, Put, Delete, Body } from "@nestjs/common";
import { UpdateDateColumn } from "typeorm";
import { User } from "../entity/User";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../service/user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: number) {
        return await this.userService.remove(id);
    }

    @Get(':id/subscription')
    async hasSubscription(@Param('id') id: number) {
        return await this.userService.hasSubscription(id);
    }

    @Post(':id/subscription')
    async buySubscription(@Param('id') id: number) {
        return await this.userService.buySubscription(id);
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return await this.userService.getById(id);
    }

}