import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Reservation } from "src/reservation/entities/reservation.entity";

export class CreatePaiementDto {
    
        @IsNotEmpty()
        @IsString()
        reference: string; 
    
        @IsOptional()
        @Type(()=>Reservation)
        reservation: Reservation

}
