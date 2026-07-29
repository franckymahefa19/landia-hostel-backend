import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Facture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    reference: string;

    @OneToOne(
        ()=>Reservation,
        reservation => reservation.facture,
        {
            eager: true,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({ name: 'reservation_id'})
    reservation: Reservation

}
