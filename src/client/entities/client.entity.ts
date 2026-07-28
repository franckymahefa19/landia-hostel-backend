import { SexeEnum } from 'src/enums/sexe.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../timestampenities/timestampentities';

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
}
