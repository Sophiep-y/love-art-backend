import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {NewsArtworks} from "../newsartworks/newsartworks.entity";
import {Transform} from "class-transformer";

@Entity('newsletters')
export class Newsletters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    title: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    nl_date: string;

    @Column({type: 'text', nullable: true})
    column1: string;

    @Column({type: 'text', nullable: true})
    column2: string;

    @Column({type: 'text', nullable: true})
    footer: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    salutation: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    artist_name: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    artist_dob: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    other1: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    other2: string;

    @Column({type: 'text', nullable: true})
    intro: string;

    @Column({type: 'tinyint', default: 0, nullable: true})
    active: number;

    @Column({type: 'int', nullable: true})
    sortkey: number;

    @Column({type: 'date', nullable: true})
    sortdate: Date;

    @Column({type: 'varchar', length: 5, nullable: true})
    emailed: string;

    @Column({type: 'datetime', nullable: true})
    emaildate: Date;

    @Column({type: 'int', nullable: true})
    createdby: number;

    @Column({type: 'tinyint', nullable: true})
    access: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    gallery: string;

    @ManyToOne(() => NewsArtworks)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'nid'
    })
    newsArtworks: NewsArtworks;

}