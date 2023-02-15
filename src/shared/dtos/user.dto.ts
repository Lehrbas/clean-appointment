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

  // @IsNotEmpty()
  // @IsEnum(Role, { message: 'Invalid role' })
  // public role?: Role;
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

  // @IsOptional()
  // @IsString()
  // public role?: string;
}
