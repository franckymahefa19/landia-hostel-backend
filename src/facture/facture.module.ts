import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facture } from './entities/facture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facture])],
  controllers: [FactureController],
  providers: [FactureService],
})
export class FactureModule {}
