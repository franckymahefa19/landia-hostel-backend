import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export class CreateFactureDto {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @Type(() => Reservation)
  @IsNotEmpty()
  reservation: Reservation;
}
