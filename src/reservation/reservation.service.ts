import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>
  ){}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const {dateDeb, dateFin} = createReservationDto;

    const conflict = await this.reservationRepository.findOne({
      where: {
        dateDeb: LessThan(new Date(dateFin)),
        dateFin: MoreThan(new Date(dateDeb))
      }
    })

    if(conflict){
      throw new ConflictException(`Il y a un conflit de réservation, la chambre est réservé du ${conflict.dateDeb} au ${conflict.dateFin} !`)
    }

    return await this.reservationRepository.save(createReservationDto);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find()
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation =  await this.reservationRepository.findOneBy({id})
    if(!reservation){
      throw new NotFoundException(`La reservation d'id ${id} est introuvable !`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationRepository.preload({id, ...updateReservationDto});
    if(!reservation){
      throw new NotFoundException(`La reservation d'id ${id} est introuvable !`);
    }
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number) {
    return await this.reservationRepository.delete({id});
  }

  async softremove(id: number) {
    const result = await this.reservationRepository.softDelete({id});
    if(result.affected === 0){
      throw new NotFoundException(`La reservation d'id ${id} est introuvable !`);
    }
    return `La réservation ${id} est désactivé !`
  }

  async restore(id: number) {
    const result = await this.reservationRepository.restore({id});
    if(result.affected === 0){
      throw new NotFoundException(`La reservation d'id ${id} est introuvable ou il n'a pas été désactivé !`);
    }
    return `La réservation ${id} est restoré !`
  }
}
