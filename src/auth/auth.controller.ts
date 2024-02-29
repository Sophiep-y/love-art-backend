import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport/dist/auth.guard';
import {JWTUser} from 'src/decorators/custom-decorators';
import {AuthService} from './auth.service';
import {LoginDTO} from './dto/login.dto';
import {UpdatePasswordDTO} from './dto/update-password.dto';
import {PasswordResetDto} from './dto/password-reset.dto';
import {Client} from "../client/client.entity";
import {PasswordResetRequestDto} from "./dto/reset-link-request.dto";
import {ApiBody, ApiHeaders, ApiOperation} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('login')
    @ApiOperation({summary: 'Log in a user'})
    @ApiBody({type: LoginDTO})
    async login(@Body() loginDTO: LoginDTO) {
        const user = await this.authService.login(loginDTO);
        const token = await this.authService.signPayload(user.email);
        return {user, token};
    }

    @Post('request-reset-password-link')
    @ApiOperation({summary: 'Request reset password link'})
    @ApiBody({type: PasswordResetRequestDto})
    async requestResetPasswordLink(@Body() requestOtpDto: PasswordResetRequestDto) {
        return await this.authService.requestResetPasswordLink(requestOtpDto);
    }


    @UseGuards(AuthGuard('jwt'), )
    @Post('/change-password')
    @ApiOperation({summary: 'Change password'})
    @ApiBody({type: UpdatePasswordDTO})
    @ApiHeaders([
        {
            name: 'Authorization',
            description: 'Bearer token',
        },
    ])
    async changePassword(
        @JWTUser() client: Client,
        @Body() updatePasswordDTO: UpdatePasswordDTO,
    ) {
        return await this.authService.changePassword(client, updatePasswordDTO);
    }

    @Post('/reset-password')
    @ApiOperation({summary: 'Reset password'})
    @ApiBody({type: PasswordResetDto})
    async resetPassword(@Body() passwordResetDto: PasswordResetDto) {
        return await this.authService.resetPassword(passwordResetDto);
    }
}
