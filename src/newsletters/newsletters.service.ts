import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Newsletters} from "./newsletters.entity";
import {Pagination, PaginationOptions} from "../utils/typeorm.pagination";

@Injectable()
export class NewslettersService {
    constructor(
        @Inject("NEWSLETTER_REPOSITORY")
        private newslettersRepository: Repository<Newsletters>,
    ) {
    }

    async findAll(options: PaginationOptions): Promise<Pagination<Newsletters>> {
        const queryBuilder = this.newslettersRepository.createQueryBuilder('newsletters');
        return await queryBuilder.paginate<Newsletters>(options);
    }

}
