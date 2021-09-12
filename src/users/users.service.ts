import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetOneQuery } from './requestTypes';
import { User, UserDocument } from './schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);

        return await newUser.save();
    }

    async getAll(): Promise<User[]> {
        return await this.userModel.find().select('-password -activationLink -isActivated').exec();
    }

    async getOne(query: GetOneQuery): Promise<User> {
        return await this.userModel.findOne(query).select('-password -activationLink -isActivated').exec();
    }

    async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }

    async removeOne(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async getOneBy(key: string, value: any): Promise<User> {
        return await this.userModel.findOne({[key]: value});
    }

    async activate(user: User): Promise<User> {
        return await this.userModel.findOneAndUpdate(user, {isActivated: true});
    }
}
