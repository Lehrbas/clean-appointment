// Defines port for users repository

import { User } from '@/core/entities/user';
import { UserDTO, UserFilterDTO } from '@/shared/dtos';
import { IRepository } from '../abstract/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IUserRepository extends IRepository<
  User,
  UserFilterDTO,
  UserDTO
> {}
