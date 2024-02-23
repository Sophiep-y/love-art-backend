import {Controller, Get, Param, Query, Res} from "@nestjs/common";
import {Artist} from "./artist.entity";
import {ArtistService} from "./artist.service";

@Controller("artist")
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {
    }

    @Get('search')
    async searchArtist(@Query('query') query: string): Promise<Artist[]> {
        return await this.artistService.search(query);
    }

    @Get(':id')
    async getOne(@Param('id') id: number, @Res() res: Response): Promise<Artist> {
        return await this.artistService.find(id);
    }
}
