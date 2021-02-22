import { IsString, Length, IsBoolean, IsUrl, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer';

export class UploadVideoDTO{
    @IsString()
    @Length(2, 50)
    title: string;

    @IsString()
    @Length(2, 50)
    description: string;

    @IsString()
    @Length(2, 50)
    categories: string;

    @IsBoolean()
    @Transform(value => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isPaid: boolean;

    @IsBoolean()
    @Transform(value => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    activateTip: boolean;

    @IsUrl()
    @IsOptional()
    videoUrl: string;

    @IsString()
    @IsOptional()
    uploadedBy: string;
}