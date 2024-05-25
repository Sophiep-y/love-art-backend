import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Artwork} from "./artworks.entity";
import {Pagination, PaginationOptions} from "../utils/typeorm.pagination";
import {classToPlain, instanceToPlain} from "class-transformer";

@Injectable()
export class ArtworksService {

    constructor(
        @Inject("ARTWORK_REPOSITORY")
        private artworkRepository: Repository<Artwork>,
    ) {
    }

    async findAll(options: PaginationOptions): Promise<Pagination<Artwork>> {
        const queryBuilder = this.artworkRepository.createQueryBuilder('artwork')
            .leftJoinAndSelect('artwork.artistObj', 'artist').where({
                recommended: '1'
            })
        return queryBuilder.paginate<Artwork>({
            ...options,
            orderBy: 'artwork.id'
        });
    }

    async findOne(id: number): Promise<Artwork> {
        const queryBuilder = this.artworkRepository.createQueryBuilder('artwork').leftJoinAndSelect('artwork.artistObj', 'artist');
        const artwork = await queryBuilder.where({id}).getOne();
        if (!artwork) {
            throw new HttpException('Could not find an artwork', HttpStatus.NOT_FOUND);
        }
        console.log(instanceToPlain(artwork));
        return artwork;
    }

}
