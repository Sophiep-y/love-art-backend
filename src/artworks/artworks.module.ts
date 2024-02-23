import {Module} from '@nestjs/common';
import {ArtworksController} from './artworks.controller';
import {ArtworksService} from './artworks.service';
import {artworksProviders} from "./artworks.providers";
import {Artwork} from "./artworks.entity";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ArtworksController],
    providers: [Artwork, ArtworksService, ...artworksProviders]
})
export class ArtworksModule {
}
