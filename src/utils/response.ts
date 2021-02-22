import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export default class JSONResponse {

    public static sendSuccessResponse(res: Response, msg: string, data: Record<string, any>): Response {
        const responseData = {
            success: true,
            message: msg,
            data,
        };
        return res.status(HttpStatus.OK).json(responseData);
    }

    public static sendErrorResponse(res: Response, msg: string, data=null, statusCode = 400): Response {
        const responseData = {
            success: false,
            message: msg,
            data,
        };
        return res.status(statusCode).json(responseData);
    }

}
