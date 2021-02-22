import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Query,
    Req,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { memoryStorage } from 'multer';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import JSONResponse from '../../utils/response';
import { AuthUserDTO, CreateUserDTO, QueryUserDTO, UpdateInterestsDTO, UpdateProfileDTO, UploadPictureDTO } from './dto/user';
import ExceptionHandler from '../../utils/exceptionhandler';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../decorators/public.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import ImageUtils from '../../utils/image';

@Controller('users')
export class UserController {

    constructor (private userService: UserService, private jwtService: JwtService) {}

    @Public()
    @Post('register')
    async registerUser(@Body() createUserDTO: CreateUserDTO, @Res() res: Response ):  Promise<Response> {
        try {
            const emailExists = await this.userService.getUserByEmail(createUserDTO.email);
            if (emailExists) {
                return JSONResponse.sendErrorResponse(res, 'Email already exists');
            }
            const usernameExists = await this.userService.getUserByUsername(createUserDTO.username);
            if (usernameExists) {
                return JSONResponse.sendErrorResponse(res, 'Username already taken');
            }
            const createdUser = await this.userService.createUser(createUserDTO);
            const userResponse = createdUser.toJSON();
            delete userResponse.password;
            return JSONResponse.sendSuccessResponse(res, 'Registration successful', userResponse);
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }

    @Put('interests')
    async updateInterests(@Body() updateInterestDTO: UpdateInterestsDTO, @Res() res: Response, @Req() req: Request ):  Promise<Response> {
        try {
            const authUser = req['user'];
            const user = await this.userService.getUserById(authUser);
            const updatedUser = await this.userService.updateInterests(user._id, updateInterestDTO);
            const userResponse = updatedUser.toJSON();
            delete userResponse.password;
            return JSONResponse.sendSuccessResponse(res, 'Interests updated successfully', userResponse);
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }
    
    @Get('profile')
    async getProfile(@Res() res: Response, @Req() req: Request):  Promise<Response> {
        try {
            const user = req['user'];
            const updatedUser = await this.userService.getUserById(user._id);
            const userResponse = updatedUser.toJSON();
            delete userResponse.password;
            return JSONResponse.sendSuccessResponse(res, 'User profile', userResponse);
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }
    
    @Put('profile')
    async updateProfile(@Body() updateProfileDTO: UpdateProfileDTO, @Res() res: Response, @Req() req: Request ):  Promise<Response> {
        try {
            const authUser = req['user'];
            const user = await this.userService.getUserById(authUser);
            if (user.username !== updateProfileDTO.username){
                const usernameExists = await this.userService.getUserByUsername(updateProfileDTO.username);
                if (usernameExists) {
                    return JSONResponse.sendErrorResponse(res, 'Username already taken');
                }
            }
            const { firstName, lastName, username, dateOfBirth, bio, websiteUrl, coverImageUrl, imageUrl  } = updateProfileDTO
            const updatedUser = await this.userService.updateProfile(user._id, { firstName, lastName, username, dateOfBirth, bio, websiteUrl, coverImageUrl, imageUrl });
            const userResponse = updatedUser.toJSON();
            delete userResponse.password;
            return JSONResponse.sendSuccessResponse(res, 'User updated successfully', userResponse);
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }

    @Public()
    @Post('auth')
    async auth(@Body() authUserDTO: AuthUserDTO, @Res() res: Response ):  Promise<Response> {
        try {
            const user = await this.userService.authenticate(authUserDTO);
            //eslint-disable-next-line
            const { password, email, ...payload} = user.toJSON();
            const token = this.jwtService.sign(payload);
            const responseData = {
                token,
                meta: {...payload}
            };
            return JSONResponse.sendSuccessResponse(res, 'Authentication successful', responseData);
        } catch (err) {
            return ExceptionHandler.dispatch(res,err);
        }
    }

    @Public()
    @Get('check')
    async checkUser(@Query() query: QueryUserDTO, @Res() res: Response): Promise<Response> {
        try {
            const { email, username } = query;
            if (!email && !username) {
                return JSONResponse.sendErrorResponse(res, 'Username or email needed');
            }
            let userExists = true;
            if (email) {
                userExists = await this.userService.getUserByEmail(email);
            } else if (username) {
                userExists = await this.userService.getUserByUsername(username);
            }
            const ok = !userExists;
            return JSONResponse.sendSuccessResponse(res, 'User credentials check', {ok});
        } catch (err) {
            return ExceptionHandler.dispatch(res,err);
        }
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('picture'))
    async uploadProfilePicture(@UploadedFile() picture, @Body() uploadPictureDTO: UploadPictureDTO, @Req() req, @Res() res: Response): Promise<Response> {
        try {
            const user = req['user'];
            if (!picture || !ImageUtils.isFileImage(picture)) {
                return JSONResponse.sendErrorResponse(res, 'Please upload a valid image/picture');
            }
            const {coverImage} = uploadPictureDTO  
            if(coverImage){
                const coverImageUrl = await ImageUtils.uploadToCloudinary(picture);
                const updatedUser = await this.userService.updateProfile(user._id, {coverImageUrl});
                const userResponse = updatedUser.toJSON();
                delete userResponse.password;
                return JSONResponse.sendSuccessResponse(res, 'Cover image added successfully', userResponse);
            }
            const imageUrl = await ImageUtils.uploadToCloudinary(picture);
            const updatedUser = await this.userService.updateUser(user._id, {imageUrl});
            const userResponse = updatedUser.toJSON();
            delete userResponse.password;
            return JSONResponse.sendSuccessResponse(res, 'Profile picture added successfully', userResponse);
            
        } catch (err) {
            return ExceptionHandler.dispatch(res, err);
        }
    }

}
