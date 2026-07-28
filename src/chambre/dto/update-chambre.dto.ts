import { PartialType } from '@nestjs/swagger';
import { CreateChambreDto } from './create-chambre.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EtatChambreEnum } from 'src/enums/etat-chambre.enum';
import { Type as TypeChambre } from 'src/type/entities/type.entity';
import { Type } from 'class-transformer';

export class UpdateChambreDto extends PartialType(CreateChambreDto) {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(EtatChambreEnum, {
    message:
      "l'état d'un chambre doit être disponible ou nettoyage ou maintenance",
  })
  @IsOptional()
  etat: string;

  @Type(() => TypeChambre)
  @IsOptional()
  type: TypeChambre;
}
