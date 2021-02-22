import { 
    Controller, 
    Body,
    Post,
    Req,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Response } from 'express';
import JSONResponse from '../../utils/response';
import { UploadVideoDTO } from './dto/video';
import ExceptionHandler from '../../utils/exceptionhandler';
import { FileInterceptor } from '@nestjs/platform-express';
import ImageUtils from '../../utils/video';

@Controller('video')
export class VideoController {
    constructor (private videoService: VideoService) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('video'))
    async uploadVideo(@UploadedFile() video, @Body() uploadVideoDTO: UploadVideoDTO, @Req() req, @Res() res: Response): Promise<Response> {
        try {
            uploadVideoDTO.uploadedBy = req['user'];
            if (!video || !ImageUtils.isFileVideo(video)) {
              return JSONResponse.sendErrorResponse(res, 'Please upload a valid video file');
            }
            uploadVideoDTO.videoUrl = await ImageUtils.uploadToCloudinary(video);
            const uploadedVideo = await this.videoService.updloadVideo(uploadVideoDTO);
            const videoResponse = uploadedVideo.toJSON();
            return JSONResponse.sendSuccessResponse(res, 'Video added successfully', videoResponse);
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }
}
