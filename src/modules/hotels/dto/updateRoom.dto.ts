import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ID } from '../../../id.type';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  hotelId: ID;

  @IsBoolean()
  @IsOptional()
  isEnabled: boolean;

  @IsArray()
  @IsString()
  @IsOptional()
  imageFiles: Array<string>;
}
