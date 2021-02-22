import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {VyconException} from '../exceptions/vycon.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    //eslint-disable-next-line
    public catch (exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = 500;
        let message = 'An error occurred. We are fixing it';
        let responseObj;
        if (exception instanceof VyconException) {
            status = exception.getStatusCode();
            message = exception.getMessage()
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            responseObj = exception.getResponse();
            message = Array.isArray(responseObj.message) ? responseObj.message[0] : responseObj.message;
        }
        response.removeHeader('X-Powered-By');
        response
            .status(status)
            .json({
                success: false,
                message: message || 'An error occurred. We are fixing it',
                data: null
            })
    }
}
