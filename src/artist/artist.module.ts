import {Module} from "@nestjs/common";
import {Artist} from "./artist";
import {DatabaseModule} from "../database/database.module";
import {ArtistService} from "./artist.service";
import {ArtistController} from "./artist.controller";
import {artistProviders} from "./artist.providers";

@Module({
    imports: [DatabaseModule],
    providers: [Artist, ...artistProviders, ArtistService],
    controllers: [ArtistController],
})
export class ArtistModule {
}
