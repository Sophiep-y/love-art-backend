import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Artist} from "../artist/artist.entity";

@Entity('artworks')
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    artist: string;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    title: string;

    @Column({type: 'text', nullable: true})
    date: string;

    @Column({type: 'text', nullable: true})
    medium: string;

    @Column({type: 'text', nullable: true})
    size: string;

    @Column({type: 'text', nullable: true})
    sizeunits: string;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    details: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    framed: string;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    location: string;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    provenance: string;

    @Column({type: 'text', nullable: true})
    literature: string;

    @Column({type: 'text', nullable: true})
    framer: string;

    @Column({type: 'text', nullable: true})
    framingdetails: string;


    @Column({type: 'float', nullable: true})
    framecost: number;

    @Column({type: 'float', nullable: true})
    valuewithframe: number;

    @Column({type: 'text', nullable: true})
    framedsize: string;

    @Column({type: 'text', nullable: true})
    consv_date: string;

    @Column({type: 'int', nullable: true})
    conservator: number;

    @Column({type: 'text', nullable: true})
    consv_action: string;

    @Column({type: 'float', nullable: true})
    purchase_price_au: number;

    @Column({type: 'float', nullable: true})
    currentvalue: number;

    @Column({type: 'float', nullable: true})
    purchase_price_orig: number;

    @Column({type: 'varchar', length: 25, nullable: true})
    purchase_currency: string;

    @Column({type: 'float', nullable: true})
    insured_value: number;

    @Column({type: 'text', nullable: true})
    notes: string;

    @Column({type: 'text', nullable: true})
    category: string;

    @Column({type: 'text', nullable: true})
    date_sold: string;

    @Column({type: 'float', nullable: true})
    sale_price: number;

    @Column({type: 'text', nullable: true})
    sale_agent: string;

    @Column({type: 'text', nullable: true})
    purchaser: string;

    @Column({type: 'int', nullable: true})
    clientid: number;


    @Column({type: 'int', nullable: true})
    artist_id: number;

    @Column({type: 'int', nullable: true})
    @Index()
    fm_id: number;

    @ManyToOne(() => Artist)
    @JoinColumn({
        name: 'fm_id',
        referencedColumnName: 'fm_id'
    })
    artistObj: Artist;

    @Column({type: 'text', charset: 'utf8', nullable: true})
    workdescription: string;

    @Column({type: 'varchar', length: 5, nullable: true})
    recommended: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    rec_status: string;

    @Column({type: 'text', nullable: true})
    exhibition: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    purchase_gst: string;

    @Column({type: 'varchar', length: 40, nullable: true})
    gstinpurchaseoriginal: string;

    @Column({type: 'varchar', length: 40, nullable: true})
    gstincurrentvalue: string;

    @Column({type: 'varchar', length: 40, nullable: true})
    gstininsurancevalue: string;

    @Column({type: 'varchar', length: 40, nullable: true})
    gstinpurchaseau: string;

}