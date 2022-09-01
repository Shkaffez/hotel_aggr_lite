import { IsString } from 'class-validator';

export class NewHotelDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
