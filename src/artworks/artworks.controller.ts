import {Controller, Get} from '@nestjs/common';
import {ArtworksService} from "./artworks.service";
import {Artwork} from "./artworks.entity";

@Controller('artworks')
export class ArtworksController {

    constructor(private readonly artworksService: ArtworksService) {
    }

    @Get()
    async getAll(): Promise<Artwork[]> {
        return await this.artworksService.findAll();
    }

}


@Controller('recommendations')
export class RecommendationsController {

    constructor(private readonly artworksService: ArtworksService) {
    }

    @Get()
    async getRecommendations(): Promise<Artwork[]> {
        return await this.artworksService.findAll();
    }

}