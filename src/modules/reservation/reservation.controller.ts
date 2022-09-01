import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { HotelRoomsService } from '../hotels/hotel.rooms.service';
import { NewReservationDto } from './dto/newReservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('Reservation')
@Controller()
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomsService,
  ) { }

  @Post('/client/reservations')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async addReservation(@Body() data: NewReservationDto, @Request() req) {
    let { hotelRoom, startDate, endDate } = data;
    const userId = req.user._doc._id;
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);
    const roomInfo = await this.hotelRoomService.findById(hotelRoom);
    const response = this.reservationService.addReservation({
      userId,
      hotelId: roomInfo.hotel,
      roomId: hotelRoom,
      dateStart,
      dateEnd,
    });
    return response;
  }

  @Get('/client/reservations')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async getCurrentUserReservations(@Request() req) {
    const userId = req.user._id;
    return this.reservationService.getCurrentUserReservations(userId);
  }

  @Delete('/client/reservations/:id')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async deleteCurrentUserReservations(@Param('id') id, @Request() req) {
    const userId = req.user._doc._id;
    await this.reservationService.deleteCurrentUserReservations(userId, id);
    return;
  }

  @Get('/manager/reservations/:userId')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async getUserReservations(@Param('userId') id) {
    return this.reservationService.getCurrentUserReservations(id);
  }

  @Delete('/manager/reservations/:userId/:reservationId')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async deleteUserReservations(
    @Param('userId') userId,
    @Param('reservationId') reservationId,
  ) {
    await this.reservationService.deleteCurrentUserReservations(
      userId,
      reservationId,
    );
    return;
  }
}
