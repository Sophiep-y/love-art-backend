import {SelectQueryBuilder} from 'typeorm';
import {HttpException, HttpStatus} from "@nestjs/common";

/**
 * Represents the paginated results and associated metadata.
 */
export interface Pagination<T> {
    /**
     * The paginated results.
     */
    results: T[];

    /**
     * Metadata about the paginated results.
     */
    meta: {
        /** The number of items on the current page. */
        pageItemCount: number;
        /** The total number of items. */
        totalItem: number;
        /** The number of items per page. */
        limit: number;
        /** The current page number. */
        page: number;
        /** The total number of pages. */
        totalPages: number;
        /** The next page number. */
        nextPage: number | null;
        /** The previous page number. */
        prevPage: number | null;
    };
}

/**
 * Represents the pagination options.
 */
export class PaginationOptions {
    /** The page number. Default is 1. */
    page: number;
    /** The limit of items per page. Default is 10. */
    limit: number;
    /** The field to order by. */
    orderBy: string;



    /**
     * Creates an instance of PaginationOptions.
     * @param page The page number.
     * @param limit The limit of items per page.
     */
    constructor(page: number = 1, limit: number = 10) {
        this.page = page;
        this.limit = limit;
    }
}

/**
 * Extends the SelectQueryBuilder to add a paginate method.
 */
declare module 'typeorm' {
    export interface SelectQueryBuilder<Entity> {
        /**
         * Retrieves paginated results based on provided options.
         * @param options The pagination options.
         * @returns A Promise that resolves to a Pagination object containing results and metadata.
         */
        paginate<T>(options: PaginationOptions): Promise<Pagination<T>>;
    }
}

/**
 * Adds a paginate method to SelectQueryBuilder.
 * This method returns paginated results based on the provided options.
 * @param options The pagination options.
 * @returns A Promise that resolves to a Pagination object containing results and metadata.
 */
SelectQueryBuilder.prototype.paginate = async function <T>(options: PaginationOptions): Promise<Pagination<T>> {
    let {page = 1, limit = 20} = options;
    page = Number(page);
    limit = Number(limit);
    // Check if pagination options are valid
    if (page < 1 || limit < 1) {
        throw new HttpException('Invalid pagination options, page and limit must be greater than zero', HttpStatus.BAD_REQUEST);
    }

    // Perform database query
    const [data, totalItems] = await this.orderBy(options.orderBy ?? 'id', 'ASC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Construct metadata
    const meta = {
        pageItemCount: data.length,
        totalItem: totalItems,
        totalPages,
        limit: limit,
        page: page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
    };

    // Return paginated results and metadata
    return {results: data, meta};
}
