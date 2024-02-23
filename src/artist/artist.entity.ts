import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: true})
    profile: string;

    @Column({type: 'int', nullable: true})
    artnet_ranking: number;

    @Column({type: 'int', nullable: true})
    fm_id: number;

    @Column({type: 'varchar', length: 255, charset: 'utf8', nullable: true})
    firstname: string;

    @Column({type: 'varchar', length: 255, charset: 'utf8', nullable: true})
    lastname: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    dateofbirth: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    dateofdeath: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    birthplace: string;
}