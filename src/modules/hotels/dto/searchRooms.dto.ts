import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ID } from 'src/modules/id.type';

export class SearchRoomsDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly limit: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly offset: number;

  @IsString()
  @ApiProperty({ type: String })
  public readonly id: ID;
}
