import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SexeEnum } from "src/enums/sexe.enum";

export class CreateClientDto {
     @IsString()
     @IsNotEmpty()
      nom: string;
    
      @IsOptional()
      @IsString()
      prenom: string;
    
      @IsString()
      @IsNotEmpty()
      adresse: string;
    
      @IsString()
      @IsNotEmpty()
      tel: string;
    
      @IsString()
      @IsOptional()
      email: string;
    
      @IsEnum(SexeEnum, {message: 'le sexe doit être homme ou femme'})
      @IsNotEmpty()
      sexe: string;
    
      @IsString()
      @IsNotEmpty()
      nationalite: string;
}
