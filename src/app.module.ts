import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule, AuthModule, HotelsModule, ReservationModule, JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017'
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
