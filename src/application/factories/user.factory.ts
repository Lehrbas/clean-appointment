// Implementation of factory for entity User

import { User } from '../../core/entities';
import { CreateUserDTO } from '@/shared/dtos';

export class UserFactory {
  public static create(data: CreateUserDTO): User {
    const { email, password } = data;
    return new User({
      email,
      password,
    });
  }
}
