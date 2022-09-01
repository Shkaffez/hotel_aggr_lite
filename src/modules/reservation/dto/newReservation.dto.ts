import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewReservationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hotelRoom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;
}
