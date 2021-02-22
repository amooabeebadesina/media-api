import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import {AuthUserDTO, CreateUserDTO, UpdateInterestsDTO } from './dto/user';
import * as bcrypt from 'bcrypt'
import { InvalidCredentialsException } from '../../exceptions/vycon.exception';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserByEmail(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({email}).lean().exec();
        return !!user;
    }

    async getUserByUsername(username: string): Promise<boolean> {
        const user = await this.userModel.findOne({username}).lean().exec();
        return !!user;
    }

    async createUser(data: CreateUserDTO): Promise<User> {
        const hash = await bcrypt.hash(data.password, 10);
        const userData = {
            ...data,
            verified: true,
            password: hash
        };
        const user = new this.userModel(userData);
        return user.save();
    }

    async authenticate(data: AuthUserDTO): Promise<User> {
        const queryData = {
            $or: [{email: data.identifier},{username:  data.identifier}]
        };
        const user = await this.userModel.findOne(queryData).exec();
        if (!user) {
            throw new InvalidCredentialsException('Invalid login credentials', 401);
        }
        const isCorrectPassword = await bcrypt.compare(data.password, user.password);
        if (!isCorrectPassword) {
            throw new InvalidCredentialsException('Invalid login credentials', 401);
        }
        return user;
    }

    async updateInterests(id: Types.ObjectId, data: UpdateInterestsDTO): Promise<User> {
        const { interests } = data;
        return await this.userModel.findByIdAndUpdate(id, {$set: {interests}}, {new: true}).exec();
    }

    async updateProfile(id: Types.ObjectId, data: Record<string, unknown>): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, {$set: data}, {new: true}).exec();
    }

    async updateUser(id: Types.ObjectId, data: Record<string, unknown>): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, {$set: data}, {new: true}).exec();
    }

    async getUserById(id: Types.ObjectId): Promise<User> {
        return await this.userModel.findById(id).exec();
    }
}
