import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { HotelRoomsService } from '../hotels/hotel.rooms.service';
import { HotelRoom, HotelRoomSchema } from '../hotels/schemas/HotelRoom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [ReservationService, HotelRoomsService],
  controllers: [ReservationController],
})
export class ReservationModule {}
