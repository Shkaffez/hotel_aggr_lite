import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ID } from '../../../id.type';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Hotel' })
  @ApiProperty({ type: String })
  hotel: ID;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ default: [] })
  @ApiProperty()
  images: Array<string>;

  @Prop({ required: true, default: new Date() })
  @ApiProperty()
  createdAt: Date;

  @Prop()
  @ApiProperty()
  updatedAt: Date;

  @Prop({ required: true, default: true })
  @ApiProperty()
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
