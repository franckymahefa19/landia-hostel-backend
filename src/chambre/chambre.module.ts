import { Module } from '@nestjs/common';
import { ChambreService } from './chambre.service';
import { ChambreController } from './chambre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chambre } from './entities/chambre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chambre])],
  controllers: [ChambreController],
  providers: [ChambreService],
})
export class ChambreModule {}
