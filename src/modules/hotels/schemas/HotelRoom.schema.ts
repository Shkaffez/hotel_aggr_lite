import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ID } from 'src/modules/id.type';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Hotel' })
  hotel: ID;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: Array<string>;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
