import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Artwork} from "./artworks.entity";
import {Pagination, PaginationOptions} from "../utils/typeorm.pagination";

@Injectable()
export class ArtworksService {

    constructor(
        @Inject("ARTWORK_REPOSITORY")
        private artistRepository: Repository<Artwork>,
    ) {
    }

    async findAll(options: PaginationOptions): Promise<Pagination<Artwork>> {
        const queryBuilder = this.artistRepository.createQueryBuilder('newsletters');
        return await queryBuilder.paginate<Artwork>(options);
    }

    async findOne(id: number): Promise<Artwork> {
        return await this.artistRepository.findOne({
            where: {id},
        });
    }

}
