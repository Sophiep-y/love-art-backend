import {ApiProperty} from "@nestjs/swagger";

export class PasswordResetRequestDto {
    @ApiProperty({
        description: 'The email of the user',
        type: String,
    })
    email: string;
}
