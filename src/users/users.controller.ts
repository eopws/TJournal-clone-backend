import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User> {
        return this.userService.getOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateOne(id, updateUserDto);
    }

    @Delete(':id')
    removeOne(@Param('id') id: string): Promise<User> {
        return this.userService.removeOne(id);
    }
}
