import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDTO } from './dto/waitlist';
import JSONResponse from '../../utils/response';

@Controller('waitlist')
export class WaitlistController {

    constructor(private waitlistService: WaitlistService) {

    }

    @Post()
    async join (@Body() joinWaitListDTO: JoinWaitlistDTO, @Res() res: Response): Promise<Response> {
        try {
            let response;
            const isExisting = await this.waitlistService.getWaitlistInfo(joinWaitListDTO.email);
            if (isExisting) {
                response = isExisting;
            } else {
                response = await this.waitlistService.create(joinWaitListDTO);
            }
            return JSONResponse.sendSuccessResponse(res, 'Added to waitlist successfully', response);
        } catch (exception) {
            return JSONResponse.sendErrorResponse(res, null, null);
        }
    }
}
