import { Chambre } from 'src/chambre/entities/chambre.entity';
import { Client } from 'src/client/entities/client.entity';
import { TimestampEntity } from 'src/client/timestampenities/timestampentities';
import { StatuReservationEnum } from 'src/enums/statut-reservation.enum';
import { Facture } from 'src/facture/entities/facture.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  
  @Column({
    type: 'enum',
    enum: StatuReservationEnum,
    default: StatuReservationEnum.EN_ATTENTE
  })
  statut: string;

  @OneToOne(
    ()=>Facture,
    facture => facture.reservation
  )
  facture: Facture

  @ManyToOne(() => Client, (client) => client.reservations, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Chambre, (chambre) => chambre.reservations, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;

  @OneToMany(() => Paiement, (paiement) => paiement.reservation)
  paiements: Paiement[];
}
