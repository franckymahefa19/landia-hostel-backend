import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SexeEnum } from 'src/enums/sexe.enum';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsString()
  @IsOptional()
  nom: string;

  @IsOptional()
  @IsString()
  prenom: string;

  @IsString()
  @IsOptional()
  adresse: string;

  @IsString()
  @IsOptional()
  tel: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsEnum(SexeEnum, { message: 'le sexe doit être homme ou femme' })
  @IsOptional()
  sexe: string;

  @IsString()
  @IsOptional()
  nationalite: string;
}
