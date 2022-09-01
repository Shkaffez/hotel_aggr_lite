import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ID } from 'src/modules/id.type';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  hotelId: ID;

  @IsBoolean()
  @IsOptional()
  isEnabled: boolean;

  @IsArray()
  @IsString()
  @IsOptional()
  imageFiles: Array<string>;
}
