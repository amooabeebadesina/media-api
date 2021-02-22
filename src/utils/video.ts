import { File } from '../interfaces/file';
import * as Cloudinary from 'cloudinary';
import {VyconException} from '../exceptions/vycon.exception';

export default class VideoUtils {

    static isFileVideo(file: File): boolean {
        const matched = file.originalname.match(/\.(mp4|MP4|wmv|WMV|mkv|MKV)$/);
        return !!matched;
    }

    private static  makeCloudinaryRequest(file): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            const cloudinaryWrapper = Cloudinary.v2;
            cloudinaryWrapper.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
            const options = {
                folder: 'vycon/videos',
                use_filename: true,
                resource_type: "video"
            };
            cloudinaryWrapper.uploader.upload_stream(options, function (error, result){
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result);
                }
            }).end(file.buffer);
        })
    }

    static async uploadToCloudinary(file: File): Promise<string> {
        try {
            const cloudinaryResponse = await VideoUtils.makeCloudinaryRequest(file);
            return cloudinaryResponse.secure_url;
        } catch (err) {
            throw new VyconException('Error uploading video', 500);
        }
    }
}
