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

    /**
     * Signs a payload with a secret key.
     * @param email - The email to be signed.
     * @returns The signed payload.
     */
    async signPayload(email: string) {
        return sign({email}, process.env.JWT_SECRET, {
            expiresIn: this.configService.get<string>('JWT_EXPIRE_TIME'),
        });
    }

    /**
     * Validates a user by their email.
     * @param email - The email of the user.
     * @returns The user if found, otherwise null.
     */
    async validateUser(email: string) {
        return this.clientService.findByEmail(email);
    }

    /**
     * Logs in a user.
     * @param UserDTO - The login data transfer object.
     * @returns The logged in user.
     * @throws {HttpException} If the user does not exist or the password is incorrect.
     */
    async login(UserDTO: LoginDTO): Promise<Client> {
        const {email, password} = UserDTO;
        const user = await this.clientService.findByEmail(email);
        if (!user) {
            throw new HttpException("User doesn't exists with given email", HttpStatus.BAD_REQUEST);
        }
        if (!(await bcrypt.compare(password, user.secpass))) {
            throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
        }
        return await this.signPayload(user.email);
    }

    /**
     * Changes a user's password.
     * @param client - The client whose password is to be changed.
     * @param updatePasswordDTO - The update password data transfer object.
     * @returns The updated client.
     * @throws {UnauthorizedException} If the old password is incorrect.
     * @throws {HttpException} If the new password is the same as the old password.
     */
    async changePassword(client: Client, updatePasswordDTO: UpdatePasswordDTO) {
        const isOldPassword = await bcrypt.compare(updatePasswordDTO.oldPassword, client.secpass);
        if (!isOldPassword) {
            throw new UnauthorizedException('Invalid Current password!!!');
        }

        const isNewPasswordSameAsOld = await bcrypt.compare(updatePasswordDTO.newPassword, client.secpass);
        if (isNewPasswordSameAsOld) {
            throw new HttpException(
                "Your new password can't be the same as the old password.",
                HttpStatus.BAD_REQUEST,
            );
        }


        await this.setNewPassword(client, updatePasswordDTO.newPassword);
        return {
            message: 'Password changed successfully',
        }
    }

    /**
     * Resets a user's password.
     * @param passwordResetDto - The password reset data transfer object.
     * @returns The updated client.
     * @throws {HttpException} If the user does not exist, the reset link is invalid or expired, or the new password is the same as the old password.
     */
    async resetPassword(passwordResetDto: PasswordResetDto) {
        const client = await this.clientService.findByEmail(passwordResetDto.email);
        if (!client) {
            throw new HttpException(
                "User with provided email doesn't exist",
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!client.otp_code || client.otp_expire_at < new Date() || !(await bcrypt.compare(passwordResetDto.otp, client.otp_code))) {
            throw new HttpException('Your reset link is invalid or expired', HttpStatus.BAD_REQUEST);
        }

        const isNewPasswordSameAsOld = await bcrypt.compare(passwordResetDto.newPassword, client.secpass);
        if (isNewPasswordSameAsOld) {
            throw new HttpException(
                'Your new password can\'t be the same as the old password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.setNewPassword(client, passwordResetDto.newPassword);
        return {
            message: 'Reset password successfully. Please login with your new password.',
        };
    }


    /**
     * Requests a password reset link.
     * @param requestOtpDto - The password reset request data transfer object.
     * @returns A message and debug information.
     * @throws {HttpException} If the user does not exist or the email could not be sent.
     */
    async requestResetPasswordLink(requestOtpDto: PasswordResetRequestDto) {
        const client = await this.clientService.findByEmail(requestOtpDto.email);
        if (!client) {
            throw new HttpException(
                "User with provided email doesn't exist",
                HttpStatus.BAD_REQUEST,
            );
        }

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
            message: 'Email sent successfully. Please check your email for the reset link.',
            debug: {
                otp: otp,
                expire_at: client.otp_expire_at,
                link: url.toString()
            }
        };
    }


    /**
     * Sets a new password for a client.
     * @param client - The client whose password is to be set.
     * @param newPassword - The new password to be set.
     * @returns The updated client.
     */
    private async setNewPassword(client: Client, newPassword: string) {
        client.secpass = await this.hashString(newPassword);
        client.need_password_reset = 0;
        client.otp_code = null;
        return this.clientService.update(client.id, client);
    }

    /**
     * Sends an email with an OTP.
     * @param otp - The OTP to be sent.
     * @param client - The client to whom the email is to be sent.
     * @returns A response.
     * @throws {HttpException} If the email could not be sent.
     */
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

    /**
     * Generates a random string of a given length.
     * @param length - The length of the string to be generated.
     * @returns The generated string.
     */
    private randomString(length: number): string {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    /**
     * Hashes a string.
     * @param input - The string to be hashed.
     * @returns The hashed string.
     */
    private async hashString(input: string): Promise<string> {
        const saltRounds = this.configService.get<number>('SALT_ROUNDS');
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(input, salt);
    }
}