import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AvailabilityDTO {
  @IsNotEmpty()
  @Type(() => Date)
  public startsAt: Date;

  @IsNotEmpty()
  @Type(() => Date)
  public endsAt: Date;

  @IsNotEmpty()
  @IsString()
  public professionalId: string;
}

export class CreateAvailabilityDTO {
  @IsNotEmpty()
  @IsString()
  public professionalId: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => Date)
  public availabilities: Array<Array<Date>>;
}

export class AvailabilityFilterDTO {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public professionalId?: string;

  @IsOptional()
  @Type(() => Date)
  public startsAt?: Date;

  @IsOptional()
  @Type(() => Date)
  public endsAt?: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  public isBetween?: [Date, Date];
}
