import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../utils/role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  public readonly contactPhone: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ enum: ['admin', 'manager', 'client'] })
  public readonly role: Role;
}
