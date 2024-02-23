import {Controller, Get, Param} from "@nestjs/common";
import {Artist} from "./artist.entity";
import {ArtistService} from "./artist.service";

@Controller("artist")
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {
    }

    @Get()
    async getAll(): Promise<Artist[]> {
        return await this.artistService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Artist> {
        return await this.artistService.find(id);
    }
}
