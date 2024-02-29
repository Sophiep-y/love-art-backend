import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class PasswordResetRequestDto {
    @ApiProperty({
        description: 'The email of the user',
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
