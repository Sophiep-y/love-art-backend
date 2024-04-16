import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';

import * as path from 'path';
import {Expose} from "class-transformer";


@Entity('newsartworks')
export class NewsArtworks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    imagename: string;

    @Column({type: 'int', nullable: true})
    nid: number;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'decimal', precision: 11, scale: 2, nullable: true})
    sortkey: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    price: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    worktitle: string;

    @Column({type: 'int', nullable: true})
    videoid: number;

    @Column({type: 'int', nullable: true})
    uploaddir: number;

    @Column({type: 'int', nullable: true})
    uploadsubdir: number;

    @Column({type: 'tinyint', nullable: true})
    currentrec: boolean;

    @Column({type: 'int', nullable: true})
    recsortkey: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    artistname: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    workdate: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    workdimensions: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    gallery: string;


    @Expose()
    get imageUrl(): string {
        return path.join(
            'newsletterimages',
            this.uploaddir.toString(), this.uploadsubdir.toString(), this.imagename,)
    }

}