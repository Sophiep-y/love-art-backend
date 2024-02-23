import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {DatabaseModule} from "./database/database.module";
import {ArtistModule} from "./artist/artist.module";
import { ArtworksModule } from './artworks/artworks.module';

@Module({
    imports: [DatabaseModule, ArtistModule, ArtworksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
