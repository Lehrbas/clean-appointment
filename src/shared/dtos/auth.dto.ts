import { Role } from '@/core/enums/role.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  public role: Role;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public field?: string;
}
