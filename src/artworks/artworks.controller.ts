import {Controller, Get, Param, Query} from '@nestjs/common';
import {ArtworksService} from "./artworks.service";
import {Artwork} from "./artworks.entity";
import {ApiQuery} from "@nestjs/swagger";
import {Pagination, PaginationOptions} from "../utils/typeorm.pagination";


@Controller('artworks')
export class ArtworksController {

    constructor(private readonly artworksService: ArtworksService) {
    }

    @Get('/recommendations')
    @ApiQuery({name: 'page', required: false, type: Number})
    @ApiQuery({name: 'limit', required: false, type: Number})
    async getRecommendations(
        @Query() options: PaginationOptions,
    ): Promise<Pagination<Artwork>> {
        return await this.artworksService.findAll(options);
    }


    @Get(':id')
    async getArtwork(
        @Param('id') id: number
    ): Promise<Artwork> {
        return await this.artworksService.findOne(id);
    }

}

