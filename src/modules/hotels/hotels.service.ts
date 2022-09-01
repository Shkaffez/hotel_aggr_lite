import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { IHotelService, SearchHotelsParams } from './interfaces';
import { Hotel, HotelDocument } from './schemas/hotel.schema';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(data: any): Promise<Hotel> {
    const { title, description } = data;
    const updateAt = new Date();
    const newHotel = new this.HotelModel({
      title,
      description,
      updateAt,
    });
    await newHotel.save();
    return await this.HotelModel.findById({ _id: newHotel._id }).select(
      '_id title description',
    );
  }

  async update(id: string, data: any): Promise<Hotel> {
    const { title, description } = data;
    const updateAt = new Date();
    return await this.HotelModel.findByIdAndUpdate(
      id,
      { title, description, updateAt },
      { new: true },
    ).select('_id title description');
  }

  async findById(id: ID): Promise<Hotel> {
    return await this.HotelModel.findById({ _id: id });
  }

  async search(params: SearchHotelsParams): Promise<Hotel[]> {
    const { limit, offset } = params;
    return await this.HotelModel.find()
      .skip(offset)
      .limit(limit)
      .select('_id title description');
  }
}
