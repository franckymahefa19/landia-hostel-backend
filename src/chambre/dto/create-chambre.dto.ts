import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EtatChambreEnum } from 'src/enums/etat-chambre.enum';
import { Type as TypeChambre } from 'src/type/entities/type.entity';
import { Type } from 'class-transformer';

export class CreateChambreDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  prix: number;

  @IsEnum(EtatChambreEnum, {
    message:
      "l'état d'un chambre doit être disponible ou nettoyage ou maintenance",
  })
  @IsNotEmpty()
  etat: string;

  @Type(() => TypeChambre)
  @IsOptional()
  type: TypeChambre;
}
