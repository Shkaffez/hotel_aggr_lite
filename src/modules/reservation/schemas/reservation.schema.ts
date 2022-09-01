import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  @ApiProperty({ type: mongoose.Types.ObjectId })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Hotel' })
  @ApiProperty({ type: mongoose.Types.ObjectId })
  hotelId: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'HotelRoom',
  })
  @ApiProperty({ type: mongoose.Types.ObjectId })
  roomId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  dateStart: Date;

  @Prop({ required: true })
  @ApiProperty()
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
