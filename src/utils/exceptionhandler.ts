import { Response } from 'express';
import { VyconException } from '../exceptions/vycon.exception';
import {HttpStatus} from '@nestjs/common';

export default class ExceptionHandler{

    public static dispatch(res: Response, exception: unknown): Response {
        let responseData = {success:false, message: 'An unexpected error occured', data: null};
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof VyconException) {
            responseData = {
                success: false,
                message: exception.getMessage(),
                data: exception.getData(),
            };
            statusCode = exception.getStatusCode();
        }
        return res.status(statusCode).json(responseData);
    }

}
