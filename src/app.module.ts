import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UsersModule, AuthModule, HotelsModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
