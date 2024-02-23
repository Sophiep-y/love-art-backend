import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {DatabaseModule} from "./database/database.module";
import {ArtistModule} from "./artist/artist.module";
import {ArtworksModule} from './artworks/artworks.module';
import {NewslettersModule} from './newsletters/newsletters.module';

@Module({
    imports: [DatabaseModule, ArtistModule, ArtworksModule, NewslettersModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
