import { Chambre } from 'src/chambre/entities/chambre.entity';
import { Client } from 'src/client/entities/client.entity';
import { TimestampEntity } from 'src/client/timestampenities/timestampentities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  dateDeb: Date;

  @Column({
    type: 'date',
  })
  dateFin: Date;

  @ManyToOne(() => Client, (client) => client.reservations, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Chambre, (chambre) => chambre.reservations , {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;


}
