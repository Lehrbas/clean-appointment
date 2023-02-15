import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AppointmentDTO {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public startsAt: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public endsAt: Date;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsNotEmpty()
  @IsString()
  public professionalId: string;

  @IsNotEmpty()
  @IsString()
  public customerId: string;
}

export class AppointmentFilterDTO {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public professionalId?: string;

  @IsOptional()
  @IsString()
  public customerId?: string;

  @IsOptional()
  @IsString()
  public status?: string;

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
