import { IsNotEmpty, IsString } from 'class-validator';

export class SlotsDTO {
  @IsNotEmpty()
  @IsString()
  public professionalId?: string;
}

export class SlotsResponseDTO {
  professionalId: string;
  slots: {
    [date: string]: string[];
  };
}
