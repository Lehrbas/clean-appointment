import { IUserRepository } from '@/application/ports';
import { UserFactory } from '@/application/factories';
import { PasswordHelper } from '@/application/helpers/password.helper';
import { CreateUserDTO, UserDTO, UserFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private usersRepository: IUserRepository) {}

  public async add(data: CreateUserDTO): Promise<UserDTO> {
    const { email, password } = data;

    const hashedPassword = await PasswordHelper.hashPassword(password);

    const user = await this.usersRepository.save(
      UserFactory.create({ email, password: hashedPassword }),
    );

    return user;
  }

  public async find(filter: UserFilterDTO): Promise<UserDTO[]> {
    return await this.usersRepository.find(filter);
  }

  public async delete(id: string): Promise<UserDTO> {
    return await this.usersRepository.delete(id);
  }
}
