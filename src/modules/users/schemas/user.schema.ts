import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../utils/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  passwordHash: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  contactPhone: string;

  @Prop({ default: Role.Client })
  @ApiProperty()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
