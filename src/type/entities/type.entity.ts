import { Chambre } from "src/chambre/entities/chambre.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(
        ()=>Chambre,
        chambre => chambre.type
    )
    chambres: Chambre[]
}
