import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Waitlist extends Document {
    @Prop({ required: true })
    email: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
