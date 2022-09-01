import { IsNumber, IsString } from 'class-validator';

export class SearchHotelsDto {
  @IsNumber()
  public readonly limit: number;

  @IsNumber()
  public readonly offset: number;
}
