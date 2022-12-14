import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  city: string;

  @Prop({ required: true, default: new Date() })
  @ApiProperty()
  createdAt: Date;

  @Prop()
  @ApiProperty()
  updatedAt: Date;

  @Prop({ default: [] })
  @ApiProperty()
  images: Array<string>;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
