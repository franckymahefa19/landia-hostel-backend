import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsDateString, IsOptional } from 'class-validator';
import { IsAfter } from 'src/decorators/isAfter';
import { Client } from 'src/client/entities/client.entity';
import { Type } from 'class-transformer';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsDateString()
  @IsOptional()
  dateDeb!: string;

  @IsDateString()
  @IsOptional()
  @IsAfter('dateDeb')
  dateFin!: string;

  @Type(()=>Client)
  @IsOptional()
  client: Client;
}
