import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exhibitions')
export class Exhibition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  artwork_id: number;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'text', nullable: true })
  gallery_name: string;

  @Column({ type: 'text', nullable: true })
  exhibit_dates: string;

  @Column({ type: 'text', nullable: true })
  exhibition_name: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'int', nullable: true })
  fm_id: number;
}
