import {ApiProperty} from "@nestjs/swagger";

export class PasswordResetDto {

  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'The new password of the user',
    type: String,
  })
  newPassword: string;

  @ApiProperty({
    description: 'The otp of the user',
    type: String,
  })
  otp: string;
}
