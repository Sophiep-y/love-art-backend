import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Artwork} from "./artworks.entity";

@Injectable()
export class ArtworksService {

    constructor(
        @Inject("ARTWORK_REPOSITORY")
        private artistRepository: Repository<Artwork>,
    ) {
    }


    async findAll(): Promise<Artwork[]> {
        return this.artistRepository.find(
            {
                take: 10,
            }
        );
    }


}
