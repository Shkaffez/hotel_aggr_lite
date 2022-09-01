import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { HotelRoomService, SearchRoomsParams } from './interfaces';
import { HotelRoom, HotelRoomDocument } from './schemas/HotelRoom.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class HotelRoomsService implements HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private connection: Connection,
  ) { }

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const { title, description, hotel, images } = data;
    const newHotelRoom = new this.HotelRoomModel({
      title,
      description,
      hotel,
      images,
    });
    await newHotelRoom.save();
    return await this.HotelRoomModel.findById({ _id: newHotelRoom._id })
      .populate({ path: 'hotel', select: '_id title description' })
      .select('_id title description images isEnabled hotel');
  }

  async findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('not valid id', HttpStatus.BAD_REQUEST);
    }
    const room = await this.HotelRoomModel.findById({ _id: id })
      .populate({
        path: 'hotel',
        select: '_id title description',
      })
      .select('_id title description images hotel')
      .exec();
    if (!room) {
      throw new HttpException('this id not exist', HttpStatus.NOT_FOUND);
    }
    if (room.isEnabled === false) {
      throw new HttpException('this room is not enabled', HttpStatus.BAD_REQUEST);
    }
    return room;
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    let { limit, offset, id } = params;
    const rooms = await this.HotelRoomModel.find({ hotel: id })
      .populate({
        path: 'hotel',
        select: '_id title',
      })
      .skip(offset)
      .limit(limit)
      .select('_id title images hotel')
      .exec();
    return rooms;
  }

  async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return await this.HotelRoomModel.findByIdAndUpdate(id, data, { new: true })
      .populate({ path: 'hotel', select: '_id title description' })
      .select('_id title description images isEnabled hotel');
  }
}
