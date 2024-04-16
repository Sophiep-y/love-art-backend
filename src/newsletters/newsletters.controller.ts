import {ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
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
    @UseInterceptors(ClassSerializerInterceptor)
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
