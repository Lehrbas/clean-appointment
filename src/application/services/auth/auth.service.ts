import { IUserRepository, ICustomerRepository } from '@/application/ports';
import {
  CustomerFactory,
  ProfessionalFactory,
  UserFactory,
} from '@/application/factories';
import { SignUpDTO } from '@/shared/dtos';
import { PasswordHelper } from '@/application/helpers/password.helper';
import { Role } from '@/core/enums/role.enum';
import { BaseResponse } from '@/shared/response/base-response';
import { IProfessionalRepository } from '@/application/ports/professionals.repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private customersRepository: ICustomerRepository,
    private professionalsRepository: IProfessionalRepository,
    private usersRepository: IUserRepository,
  ) {}

  public async signup(data: SignUpDTO): Promise<BaseResponse> {
    const hashedPassword = await PasswordHelper.hashPassword(data.password);
    const user = await this.usersRepository.save(
      UserFactory.create({
        email: data.email,
        password: hashedPassword,
        role: data.role,
      }),
    );

    if (data.role === Role.CUSTOMER) {
      await this.customersRepository.save(
        CustomerFactory.create({ name: data.name, userId: user.id }),
      );
    }

    if (data.role === Role.PROFESSIONAL) {
      await this.professionalsRepository.save(
        ProfessionalFactory.create({
          name: data.name,
          userId: user.id,
          field: data.field,
        }),
      );
    }

    return {
      status: 201,
      message: `${data.role} account created`,
    };
  }
}
