import { SexeEnum } from 'src/enums/sexe.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../timestampenities/timestampentities';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class Client extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({
    nullable: true
  })
  prenom: string;

  @Column()
  adresse: string;

  @Column()
  tel: string;

  @Column({
    nullable: true
  })
  email: string;

  @Column({
    type: 'enum',
    enum: SexeEnum,
    default: SexeEnum.HOMME,
  })
  sexe: string;

  @Column()
  nationalite: string;

   @OneToMany(
    () => Reservation,
    (reservation) => reservation.client,
  )
  reservations: Reservation[];
}
