import {Inject, Injectable, Logger} from "@nestjs/common";
import {ILike, Repository} from "typeorm";
import {Artist} from "./artist.entity";

@Injectable()
export class ArtistService {
    private logger = new Logger('ArtistService');

    constructor(
        @Inject("ARTIST_REPOSITORY")
        private artRepository: Repository<Artist>,
    ) {
    }

    async search(query: string): Promise<Artist[]> {
        return this.artRepository.find({
            where: [
                {firstname: ILike(`%${query}%`)},
                {lastname: ILike(`%${query}%`)},
            ],
            take: 20,
        });
    }

    async find(id: number): Promise<Artist> {
        this.logger.log(`Finding artist with id: ${id}`);
        const artist = this.artRepository.findOneBy({
            id
        });
        if (!artist) {
            throw new Error(`Artist with id ${id} not found`);
        }
        return artist;
    }
}
