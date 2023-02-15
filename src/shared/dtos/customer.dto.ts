import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDTO {
  public name: string;
  public userId?: string;
}

export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public userId?: string;
}

export class CustomerFilterDTO {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  public createdBetween?: [Date, Date];
}
