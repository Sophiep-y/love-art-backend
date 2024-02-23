import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Artist} from "./artist.entity";

@Injectable()
export class ArtistService {
    constructor(
        @Inject("ARTIST_REPOSITORY")
        private photoRepository: Repository<Artist>,
    ) {
    }

    async findAll(): Promise<Artist[]> {
        return this.photoRepository.find();
    }

    async find(id: number): Promise<Artist> {
        return this.photoRepository.findOne({
            where: {id},
        });
    }
}
