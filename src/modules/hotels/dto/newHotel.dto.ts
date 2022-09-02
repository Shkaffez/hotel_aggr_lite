import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewHotelDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;
}
