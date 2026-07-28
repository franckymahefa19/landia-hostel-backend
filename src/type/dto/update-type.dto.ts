import { PartialType } from '@nestjs/swagger';
import { CreateTypeDto } from './create-type.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @IsOptional()
  @IsString()
  nom: string;
}
