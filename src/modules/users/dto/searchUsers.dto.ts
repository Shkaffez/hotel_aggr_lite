import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchUsersDto {
  @IsNumber()
  @ApiProperty()
  public readonly limit: number;

  @IsNumber()
  @ApiProperty()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly contactPhone: string;
}
