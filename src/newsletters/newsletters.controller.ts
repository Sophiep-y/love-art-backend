import {Controller, Get, Query} from '@nestjs/common';
import {NewslettersService} from "./newsletters.service";
import {Newsletters} from "./newsletters.entity";
import {Pagination, PaginationOptions} from "../utils/typeorm.pagination";
import {ApiQuery} from '@nestjs/swagger';

@Controller('archives')
export class ArchivesController {
    constructor(
        private readonly newslettersService: NewslettersService,
    ) {
    }

    @ApiQuery({name: 'page', required: false, type: Number})
    @ApiQuery({name: 'limit', required: false, type: Number})
    @Get()
    async getAll(
        @Query() options: PaginationOptions,
    ): Promise<Pagination<Newsletters>> {

        return await this.newslettersService.findAll(
            {
                ...options,
            }
        );
    }
}
