import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("artists")
export class Artist {
  @PrimaryColumn()
  id: string;

  @Column({ type: "text", nullable: true })
  profile: string;

  @Column({ nullable: true })
  artnet_ranking: string;

  @Column()
  fm_id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  dateofbirth: string;

  @Column({ nullable: true })
  dateofdeath: string;

  @Column()
  birthplace: string;
}
