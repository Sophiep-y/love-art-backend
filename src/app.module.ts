import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {DatabaseModule} from "./database/database.module";
import {ArtistModule} from "./artist/artist.module";
import {ArtworksModule} from './artworks/artworks.module';
import {NewslettersModule} from './newsletters/newsletters.module';
import {LoggingMiddleware} from "./middleware/logger.middleware";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        DatabaseModule,
        ArtistModule,
        ArtworksModule,
        NewslettersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes('*');
    }
}
