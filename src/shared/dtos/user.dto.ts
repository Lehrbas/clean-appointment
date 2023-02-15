import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@/core/enums/role.enum';

export class UserDTO {
  public id: string;
  public email: string;
  public password: string;
  public role: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public role: string;
}

export class UserFilterDTO {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  public createdBetween?: [Date, Date];

  @IsOptional()
  @IsEnum(Role)
  public role?: Role;
}
