import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {ClientModule} from "../client/client.module";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [ClientModule, MailModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports:[AuthService]
})
export class AuthModule {
}
