import { EtatChambreEnum } from 'src/enums/etat-chambre.enum';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { TimestampEntities } from 'src/TimeStampEntities/TimeStampEntities';
import { Type } from 'src/type/entities/type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chambre extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: EtatChambreEnum,
    default: EtatChambreEnum.DISPONIBLE,
  })
  etat: string;

  @Column()
  prix: number;

  @Column({
    nullable: true,
  })
  image1: string;

  @Column({
    nullable: true,
  })
  image2: string;

  @Column({
    nullable: true,
  })
  image3: string;

  @Column({
    nullable: true,
  })
  image4: string;

  @ManyToOne(() => Type, (type) => type.chambres, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToMany(() => Reservation, (reservation) => reservation.chambre)
  reservations: Reservation;
}
