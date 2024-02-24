import {Module} from '@nestjs/common';
import {ArtworksController} from './artworks.controller';
import {ArtworksService} from './artworks.service';
import {DatabaseModule} from "../database/database.module";
import {Database} from "../database/database";
import {Artwork} from "./artworks.entity";

@Module({
    imports: [DatabaseModule],
    controllers: [ArtworksController],
    providers: [ArtworksService,
        {
            provide: "ARTWORK_REPOSITORY",
            useFactory: (dataSource: any) => dataSource.getRepository(Artwork),
            inject: [Database],
        }
    ]
})
export class ArtworksModule {
}
