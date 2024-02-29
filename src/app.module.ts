import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {DatabaseModule} from "./database/database.module";
import {ArtistModule} from "./artist/artist.module";
import {ArtworksModule} from './artworks/artworks.module';
import {NewslettersModule} from './newsletters/newsletters.module';
import {LoggingMiddleware} from "./middleware/logger.middleware";
import {ConfigModule} from "@nestjs/config";
import {ExhibitionsController} from './exhibitions/exhibitions.controller';
import {ExhibitionsModule} from './exhibitions/exhibitions.module';
import {AuthController} from './auth/auth.controller';
import {ClientModule} from './client/client.module';
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        DatabaseModule,
        ArtistModule,
        ArtworksModule,
        NewslettersModule,
        ExhibitionsModule,
        ClientModule,
        AuthModule,
    ],
    controllers: [AppController, ExhibitionsController, AuthController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes('*');
    }
}
