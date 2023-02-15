// Defines port for customers repository

import { Customer } from '@/core/entities/customer';
import { IRepository } from '../abstract/repository';
import { CustomerDTO, CustomerFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ICustomerRepository extends IRepository<
  Customer,
  CustomerFilterDTO,
  CustomerDTO
> {}
