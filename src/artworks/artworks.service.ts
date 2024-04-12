import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Artwork } from "./artworks.entity";
import { Pagination, PaginationOptions } from "../utils/typeorm.pagination";

@Injectable()
export class ArtworksService {

  constructor(
    @Inject("ARTWORK_REPOSITORY")
    private artworkRepository: Repository<Artwork>,


  ) {
  }

  async findAll(options: PaginationOptions): Promise<Pagination<Artwork>> {
    const queryBuilder = this.artworkRepository.createQueryBuilder('artwork')
        .leftJoinAndSelect('artwork.artistObj', 'artist');
   return queryBuilder.paginate<Artwork>({
     ...options,
     orderBy: 'artwork.id'
   });
  }

  async findOne(id: number): Promise<Artwork> {
    const artwork = await this.artworkRepository.findOne({
      where: { id },
    });
    if (!artwork) {
      throw new HttpException('Could not find an artwork', HttpStatus.NOT_FOUND);
    }
    return artwork;
  }

}
