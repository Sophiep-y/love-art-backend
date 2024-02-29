import {ApiProperty} from "@nestjs/swagger";

export class UpdatePasswordDTO {
    @ApiProperty({
        description: 'The new password of the user',
        type: String,
    })
    newPassword: string;
    @ApiProperty({
        description: 'The old password of the user',
        type: String,
    })
    oldPassword: string;
}
