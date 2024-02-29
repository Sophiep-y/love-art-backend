import {HttpException, HttpStatus, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {ClientService} from '../client/client.service';
import {LoginDTO} from "./dto/login.dto";
import {Client} from "../client/client.entity";
import * as bcrypt from 'bcrypt';
import {UpdatePasswordDTO} from "./dto/update-password.dto";
import {PasswordResetDto} from "./dto/password-reset.dto";
import {ConfigService} from "@nestjs/config";
import {PasswordResetRequestDto} from "./dto/reset-link-request.dto";
import {MailService} from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger('AuthService');

    constructor(private readonly clientService: ClientService,
                private mailService: MailService,
                private configService: ConfigService,
    ) {
    }

    async signPayload(email: string) {
        return sign(email, process.env.JWT_SECRET, {
            // expiresIn: '1d',
        });
    }

    async validateUser(email: string) {
        return await this.clientService.findByEmail(email);
    }

    async login(UserDTO: LoginDTO): Promise<Client> {
        const {email, password} = UserDTO;
        const user = await this.clientService.findByEmail(email);

        if (user.need_password_reset) {
            throw new HttpException({
                message: 'You need to reset your password',
                error_code: 'NEED_PASSWORD_RESET',
            }, HttpStatus.BAD_REQUEST);
        }
        if (!user)
            throw new HttpException("User doesn't exists with given email", HttpStatus.BAD_REQUEST);
        if (!(await bcrypt.compare(password, user.secpass)))
            throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
        return user
    }


    async changePassword(client: Client, updatePasswordDTO: UpdatePasswordDTO) {
        if (!(await bcrypt.compare(updatePasswordDTO.oldPassword, client.secpass)))
            throw new UnauthorizedException('Invalid Current password!!!');
        if (await bcrypt.compare(updatePasswordDTO.newPassword, client.secpass))
            throw new HttpException(
                "Your new password can't be the same as the old password.",
                HttpStatus.BAD_REQUEST,
            );
        client.secpass = updatePasswordDTO.newPassword;
        client.need_password_reset = 0;
        return this.clientService.update(client.id, client);
    }

    async resetPassword(passwordResetDto: PasswordResetDto) {
        const client = await this.clientService.findByEmail(passwordResetDto.email);
        if (!client)
            throw new HttpException(
                "User with provided email doesn't exist",
                HttpStatus.BAD_REQUEST,
            );

        if (client.otp_expire_at < new Date()) {
            throw new HttpException('Your reset link expired.', HttpStatus.BAD_REQUEST);
        }

        if (!(await bcrypt.compare(passwordResetDto.otp, client.otp_code)))
            throw new HttpException('Your reset link did not match', HttpStatus.BAD_REQUEST);


        if (await bcrypt.compare(passwordResetDto.newPassword, client.secpass)) {
            throw new HttpException(
                'You can not set your old password as new password',
                HttpStatus.BAD_REQUEST,
            );
        }

        client.secpass = await this.hashString(passwordResetDto.newPassword);
        client.need_password_reset = 0;
        return this.clientService.update(client.id, client);
    }


    async requestResetPasswordLink(requestOtpDto: PasswordResetRequestDto) {
        const client = await this.clientService.findByEmail(requestOtpDto.email);
        if (!client)
            throw new HttpException(
                "User with provided email doesn't exist",
                HttpStatus.BAD_REQUEST,
            );
        const otp = this.randomString(6);
        client.otp_code = await this.hashString(otp);
        client.otp_expire_at = new Date(new Date().getTime() + this.configService.get<number>('OTP_EXPIRE_SECONDS') * 1000);
        const updatedClient = await this.clientService.update(client.id, client);
        await this.sendMail(otp, updatedClient);

        const url = new URL(this.configService.get<string>('FRONTEND_URL_PASSWORD_RESET'));
        const params = new URLSearchParams({
            otp: otp,
            email: client.email
        });
        url.search = params.toString();

        return {
            message: 'Otp will be sent if the user with provided email exits.',
            debug: {
                otp: otp,
                expire_at: client.otp_expire_at,
                link: url.toString()
            }
        };
    }


    private async sendMail(otp: string, client: Client) {
        this.mailService.sendUserOTP(client, otp).then(
            () => {
                this.logger.log(`OTP Email sent to [${client.email}]`);
                return new Response('Email sent successfully')
            },
            (e) => {
                this.logger.error(
                    `Could not send email to [${client.email}]`,
                    e.toString(),
                );
                throw new HttpException(
                    'Could not send email',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            },
        );
    }


    private randomString(length: number): string {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    private async hashString(input: string): Promise<string> {
        const saltRounds = this.configService.get<number>('SALT_ROUNDS');
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(input, salt);
    }
}
