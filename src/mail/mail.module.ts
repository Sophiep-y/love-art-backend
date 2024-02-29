import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {join} from 'path';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: Number(process.env.MAIL_HOST_PORT),
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            },
            defaults: {
                from: "loveart@admin.com",
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {strict: true},
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {
}
