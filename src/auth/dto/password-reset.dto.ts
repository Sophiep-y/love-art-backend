import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class PasswordResetDto {

    @ApiProperty({
        description: 'The email of the user',
        type: String,
    })
    @IsNotEmpty(
        {
            message: 'Email should not be empty'
        }
    )
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The new password of the user',
        type: String,
    })
    @IsNotEmpty(
        {
            message: 'New password should not be empty'
        }
    )
    newPassword: string;

    @ApiProperty({
        description: 'The otp of the user',
        type: String,
    })
    @IsNotEmpty(
        {
            message: 'OTP should not be empty'
        }
    )
    otp: string;
}
