import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, isValidObjectId } from 'mongoose';

@Schema()
export class Video extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    categories: string;

    @Prop({ required: true })
    isPaid: boolean;

    @Prop({ required: true })
    activateTip: boolean;

    @Prop({ required: true })
    videoUrl: string;

    @Prop({ type:isValidObjectId, required: true })
    uploadedBy: string
}

export const VideoSchema = SchemaFactory.createForClass(Video);
