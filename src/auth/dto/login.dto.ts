import {ApiProperty} from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({
        description: 'The email of the user',
        type: String,
    })
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
    })

    password: string;
}