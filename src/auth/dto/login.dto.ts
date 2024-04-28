import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginDTO {
    @ApiProperty({
        description: 'Username of client',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    username: string;


    @ApiProperty({
        description: 'The password of the user',
        type: String,
        required: true
    })
    @IsNotEmpty(
        {
            message: 'Password should not be empty'
        }
    )
    password: string;
}