import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfessionalDTO {
  public name: string;
  public field: string;
  public userId?: string;
}

export class CreateProfessionalDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public field: string;

  @IsOptional()
  @IsString()
  public userId?: string;
}

export class ProfessionalFilterDTO {
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
  @IsString()
  public field?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  public createdBetween?: [Date, Date];
}
