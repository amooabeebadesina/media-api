import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop([String])
    interests: string[];

    @Prop({ default: 'INDIVIDUAL' })
    userType: string;

    @Prop({ default: false })
    verified: boolean;

    @Prop({ default: null})
    imageUrl: string;

    @Prop({ default: null})
    websiteUrl: string;

    @Prop({ default: null})
    bio: string;

    @Prop({ default: null})
    dateOfBirth: Date;

    @Prop({ default: null})
    coverImageUrl: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
