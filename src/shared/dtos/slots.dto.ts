import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SlotsDTO {
  @IsNotEmpty()
  @IsString()
  public professionalId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public startsAt?: Date;
}

export class SlotsResponseDTO {
  professionalId: string;
  slots: {
    [date: string]: string[];
  };
}
