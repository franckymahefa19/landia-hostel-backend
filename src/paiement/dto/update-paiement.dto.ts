import { PartialType } from '@nestjs/swagger';
import { CreatePaiementDto } from './create-paiement.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export class UpdatePaiementDto extends PartialType(CreatePaiementDto) {
  @IsOptional()
  @IsString()
  reference: string;

  @IsOptional()
  @Type(() => Reservation)
  reservation: Reservation;
}
