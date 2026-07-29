import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { ReservationModule } from './reservation/reservation.module';
import { ChambreModule } from './chambre/chambre.module';
import { TypeModule } from './type/type.module';
import { PaiementModule } from './paiement/paiement.module';
import { FactureModule } from './facture/facture.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),
    ClientModule,
    ReservationModule,
    ChambreModule,
    TypeModule,
    PaiementModule,
    FactureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
