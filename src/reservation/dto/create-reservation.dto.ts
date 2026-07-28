import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Chambre } from 'src/chambre/entities/chambre.entity';
import { Client } from 'src/client/entities/client.entity';
import { IsAfter } from 'src/decorators/isAfter';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  dateDeb: string;

  @IsDateString()
  @IsNotEmpty()
  @IsAfter('dateDeb')
  dateFin: string;

  @Type(() => Client)
  @IsOptional()
  client: Client;

  @Type(() => Chambre)
  @IsOptional()
  chambre: Chambre;
}
