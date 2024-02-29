import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class UpdatePasswordDTO {
    @ApiProperty({
        description: 'The new password of the user',
        type: String,
    })
    @IsNotEmpty()
    newPassword: string;

    @ApiProperty({
        description: 'The old password of the user',
        type: String,
    })
    @IsNotEmpty()
    oldPassword: string;
}
