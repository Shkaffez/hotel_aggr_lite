import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    HotelsModule,
    ReservationModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017'
    ),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
