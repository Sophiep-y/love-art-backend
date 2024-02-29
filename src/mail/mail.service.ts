import {MailerService} from '@nestjs-modules/mailer';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Client} from "../client/client.entity";

@Injectable()
export class MailService {
    private logger: Logger = new Logger('MailService');

    constructor(private mailerService: MailerService,
                private readonly configService: ConfigService
    ) {
    }

    async sendUserOTP(client: Client, otp: string): Promise<string> {
        const url = new URL(this.configService.get<string>('FRONTEND_URL_PASSWORD_RESET'));
        const params = new URLSearchParams({
            otp: otp,
            email: client.email
        });
        url.search = params.toString();
        const link = url.toString();
        await this.mailerService.sendMail({
            to: client.email,
            subject: 'OTP',
            template: 'otp-send',
            context: {
                name: client.first_name,
                link,
            },
        });
        this.logger.log(`Email sent successfully to [${client.email}]`);

        return otp;
    }
}
