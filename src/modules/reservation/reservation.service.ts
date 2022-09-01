import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import {
  IReservation,
  Reservationdto,
  ReservationSearchOptions,
} from './interfaces';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private readonly ReservationModel: Model<ReservationDocument>,
    @InjectConnection() private connection: Connection,
  ) { }

  async addReservation(data: Reservationdto): Promise<Reservation> {
    const { roomId, dateStart, dateEnd } = data;
    const isReserved = this.ReservationModel.find({
      roomId: roomId,
      dateStart: { $gte: dateStart },
      dateEnd: { $lte: dateEnd }
    });
    if (isReserved) {
      throw new HttpException('this dates alredy reserved', HttpStatus.BAD_REQUEST);
    }

    const newReservation = new this.ReservationModel(data);
    await newReservation.save();
    const reservInfo = await this.ReservationModel.findById({
      _id: newReservation._id,
    })
      .populate({ path: 'roomId', select: 'title description images' })
      .populate({ path: 'hotelId', select: 'title description' })
      .select('dateStart dateEnd hotelRoom hotel')
      .exec();
    return reservInfo;
  }

  async removeReservation(id: ID): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('not valid id', HttpStatus.NOT_FOUND);
    }
    const reservation = await this.ReservationModel.findById({ _id: id });
    if (!reservation) {
      throw new HttpException(
        'this reservation not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.ReservationModel.findByIdAndDelete({ _id: id });
    return;
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    let { userId, dateStart, dateEnd } = filter;
    dateStart = new Date(dateStart);
    dateEnd = new Date(dateEnd);
    return await this.ReservationModel.find({
      userId: userId,
      dateStart: { $gte: dateStart },
      dateEnd: { $lte: dateEnd },
    });
  }

  async getCurrentUserReservations(id: ID): Promise<Reservation[]> {
    id = new mongoose.Types.ObjectId(id);
    return await this.ReservationModel.find({ userId: id })
      .populate({ path: 'roomId', select: 'title description images' })
      .populate({ path: 'hotelId', select: 'title description' })
      .select('dateStart dateEnd hotelRoom hotel')
      .exec();
  }

  async deleteCurrentUserReservations(
    userId: ID,
    reservationId: ID,
  ): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      throw new HttpException('not valid id', HttpStatus.BAD_REQUEST);
    }
    const reservation = await this.ReservationModel.findById({
      _id: reservationId,
    });
    if (!reservation) {
      throw new HttpException(
        'this reservation not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!reservation.userId.equals(userId)) {
      throw new HttpException(
        'this reserve belongs to another user',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.ReservationModel.findByIdAndDelete({ _id: reservationId });
    return;
  }

  async deleteUserReservations(userId: ID, reservationId: ID): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      throw new HttpException('not valid id', HttpStatus.BAD_REQUEST);
    }
    const reservation = await this.ReservationModel.findById({
      _id: reservationId,
    });
    if (!reservation) {
      throw new HttpException(
        'this reservation not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!reservation.userId.equals(userId)) {
      throw new HttpException(
        'this reserve belongs to another user',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.ReservationModel.findByIdAndDelete({ _id: reservationId });
    return;
  }
}
