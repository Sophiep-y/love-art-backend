import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    clientid: number;

    @Column({type: 'text', nullable: true})
    collection_type: string;

    @Column({type: 'text', nullable: true})
    @Index()
    catalogue_name: string;

    @Column({type: 'text', nullable: true})
    company: string;

    @Column({length: 8, nullable: true})
    salutation: string;

    @Column({length: 15, nullable: true})
    first_name: string;

    @Column({length: 25, nullable: true})
    last_name: string;

    @Column({length: 80, nullable: true})
    @Index()
    email: string;

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({type: 'text', nullable: true})
    city: string;

    @Column({length: 20, nullable: true})
    state: string;

    @Column({length: 8, nullable: true})
    postcode: string;

    @Column({length: 90, nullable: true})
    mobile: string;

    @Column({type: 'text', nullable: true})
    workphone: string;

    @Column({type: 'text', nullable: true})
    fax: string;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: true})
    growth_in_value: number;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: true})
    total_purchase_cost: number;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: true})
    total_value_current: number;

    @Column({length: 45, nullable: true})
    @Index()
    webusername: string;

    // @Column({length: 45, nullable: true})
    // @Index()
    // password: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    insuredvalue: number;

    @Column({nullable: true})
    @Index()
    logincount: number;

    @Column({length: 255, nullable: true})
    @Index()
    loginhash: string;

    @Column({length: 5, nullable: true})
    advicememos: string;

    @Column({length: 255, nullable: true})
    secpass: string;

    @Column({type: 'datetime', nullable: true})
    otp_expire_at: Date;

    @Column({type: 'varchar', nullable: true})
    otp_code: string;

    @Column({type: 'tinyint', nullable: true})
    need_password_reset: number;
}