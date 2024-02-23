import {Module} from '@nestjs/common';
import {ArtworksController, RecommendationsController} from './artworks.controller';
import {ArtworksService} from './artworks.service';
import {artworksProviders} from "./artworks.providers";
import {Artwork} from "./artworks.entity";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ArtworksController,RecommendationsController],
    providers: [Artwork, ArtworksService, ...artworksProviders]
})
export class ArtworksModule {
}
