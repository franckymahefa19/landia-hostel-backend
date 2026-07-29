import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { IsAfter } from 'src/decorators/isAfter';
import { Client } from 'src/client/entities/client.entity';
import { Type } from 'class-transformer';
import { Chambre } from 'src/chambre/entities/chambre.entity';
import { StatuReservationEnum } from 'src/enums/statut-reservation.enum';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsDateString()
  @IsOptional()
  dateDeb: string;

  @IsDateString()
  @IsOptional()
  @IsAfter('dateDeb')
  dateFin: string;

  @IsOptional()
  @IsEnum(StatuReservationEnum, {
    message: 'le statut doit être en attent, confirmée, anulée ou terminée !',
  })
  statut: string;

  @Type(() => Client)
  @IsOptional()
  client: Client;

  @Type(() => Chambre)
  @IsOptional()
  chambre: Chambre;
}
