import { PartialType } from '@nestjs/swagger';
import { CreateFactureDto } from './create-facture.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export class UpdateFactureDto extends PartialType(CreateFactureDto) {
  @IsString()
  @IsOptional()
  reference: string;

  @Type(() => Reservation)
  @IsOptional()
  reservation: Reservation;
}
