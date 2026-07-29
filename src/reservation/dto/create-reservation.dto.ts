import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Chambre } from 'src/chambre/entities/chambre.entity';
import { Client } from 'src/client/entities/client.entity';
import { IsAfter } from 'src/decorators/isAfter';
import { StatuReservationEnum } from 'src/enums/statut-reservation.enum';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  dateDeb: string;

  @IsDateString()
  @IsNotEmpty()
  @IsAfter('dateDeb')
  dateFin: string;

  @IsNotEmpty()
  @IsEnum(StatuReservationEnum, {message: 'le statut doit être en attent, confirmée, anulée ou terminée !'})
  statut: string;

  @Type(() => Client)
  @IsOptional()
  client: Client;

  @Type(() => Chambre)
  @IsOptional()
  chambre: Chambre;
}
