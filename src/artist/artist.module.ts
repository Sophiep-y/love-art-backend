import {Module} from "@nestjs/common";
import {ArtistService} from "./artist.service";
import {ArtistController} from "./artist.controller";
import {Database} from "../database/database";
import {DatabaseModule} from "../database/database.module";
import {Artist} from "./artist.entity";

@Module({
    imports: [DatabaseModule],
    providers: [
        ArtistService,
        {
            provide: "ARTIST_REPOSITORY",
            useFactory: (database: Database) => database.getRepository(Artist),
            inject: [Database],
        },
    ],
    controllers: [ArtistController],
})
export class ArtistModule {
}
