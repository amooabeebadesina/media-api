import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';

@Module({
    controllers: [VideoController],
    imports: [
      
      MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
    ],
    providers: [VideoService]
})

@Module({})
export class VideoModule {}
