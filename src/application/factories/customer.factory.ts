// Implementation of factory for entity Customer

import { Customer } from '../../core/entities';
import { CreateCustomerDTO } from '@/shared/dtos';

export class CustomerFactory {
  public static create(data: CreateCustomerDTO): Customer {
    return new Customer({
      ...data,
    });
  }
}
