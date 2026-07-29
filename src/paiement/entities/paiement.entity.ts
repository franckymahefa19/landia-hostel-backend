import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Paiement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reference: string; 

    @ManyToOne(
        ()=>Reservation,
        reservation => reservation.paiements,
        {
            nullable: true,
            eager: true,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({name: 'reservation_id'})
    reservation: Reservation
}
