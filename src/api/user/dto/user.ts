import {IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsDate, IsUrl, IsBoolean} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Valid email is required' })
    email: string;

    @IsString()
    @Length(2, 50)
    firstName: string;

    @IsString()
    @Length(2, 50)
    username: string;

    @IsString()
    @Length(2, 50)
    lastName: string;

    @IsString()
    @Length(3, 50)
    password: string;

    @IsString({ message: 'User type must be a valid type' })
    @IsOptional()
    userType: string;

    @IsOptional()
    @IsArray({ message: 'One or more interests must be selected' })
    interests: string[];
}

export class UpdateProfileDTO {
    @IsString()
    @Length(2, 50)
    firstName: string;

    @IsString()
    @Length(2, 50)
    username: string;

    @IsString()
    @Length(2, 50)
    lastName: string;

    @IsString()
    @IsOptional()
    @Length(2, 50)
    bio: string;

    @IsUrl()
    @IsOptional()
    @Length(2, 50)
    websiteUrl: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dateOfBirth: Date;

    @IsUrl()
    @IsOptional()
    imageUrl: string;

    @IsUrl()
    @IsOptional()
    coverImageUrl: string;
}

export class AuthUserDTO {

    @IsString({ message: 'Email or username is required' })
    identifier: string;

    @IsString({ message: 'Password is a required string' })
    password: string;
}

export class QueryUserDTO {

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    username: string;
}

export class UpdateInterestsDTO {
    @IsArray({ message: 'One or more interests must be selected' })
    interests: string[];
}

export class UploadPictureDTO {
    @IsBoolean()
    @Transform(value => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    coverImage: boolean;
}