import {HttpException, HttpStatus, Inject, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {Artist} from "./artist.entity";

@Injectable()
export class ArtistService {
    private logger = new Logger('ArtistService');

    constructor(
        @Inject("ARTIST_REPOSITORY")
        private artistRepository: Repository<Artist>,
    ) {
    }

    async search(query: string): Promise<Artist[]> {

        return this.artistRepository.createQueryBuilder('artist')
            .leftJoinAndSelect('artist.artworks', 'artwork')
            .where('LOWER(artist.firstname) LIKE :query', {query: `%${query.toLowerCase()}%`})
            .orWhere('LOWER(artist.lastname) LIKE :query', {query: `%${query.toLowerCase()}%`})
            .take(20)
            .getMany();

    }

    async find(id: number): Promise<Artist> {
        this.logger.log(`Finding artist with id: ${id}`);
        const artist = await this.artistRepository
            .createQueryBuilder('artist')
            .leftJoinAndSelect('artist.artworks', 'artwork')
            .where('artist.fm_id = :id', {id})
            .getOne();

        if (!artist) {
            throw new HttpException('Could not find an artist', HttpStatus.NOT_FOUND);
        }
        return artist;
    }
}
