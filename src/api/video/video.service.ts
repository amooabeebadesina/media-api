import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { Model } from 'mongoose';
import { UploadVideoDTO } from './dto/video';

@Injectable()
export class VideoService {

    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

    async updloadVideo(data: UploadVideoDTO): Promise<Video> {
        const video = new this.videoModel(data);
        return video.save();
    } 
}
