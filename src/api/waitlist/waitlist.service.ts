import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Waitlist } from './schemas/waitlist.schema';
import { Model } from 'mongoose';
import { JoinWaitlistDTO } from './dto/waitlist';

@Injectable()
export class WaitlistService {

    constructor (@InjectModel(Waitlist.name) private waitlistModel: Model<Waitlist>) {}

    async create(joinWaitlistDTO: JoinWaitlistDTO): Promise<Waitlist> {
        const createdWaitlist = new this.waitlistModel(joinWaitlistDTO);
        return createdWaitlist.save();
    }

    async getWaitlistInfo(email: string): Promise<Waitlist> {
        return this.waitlistModel.findOne({email}).exec();
    }
}
