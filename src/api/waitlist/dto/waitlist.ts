import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinWaitlistDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
