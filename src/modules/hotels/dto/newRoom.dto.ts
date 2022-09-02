import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ID } from '../../../id.type';

export class NewRoomDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty({ type: String })
  hotelId: ID;
}
