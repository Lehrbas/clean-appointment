import { CustomerDTO, CustomerFilterDTO } from '@/shared/dtos';
import { CreateCustomerDTO } from '@/shared/dtos';
import { CustomerFactory } from '../factories';
import { ICustomerRepository } from '../ports';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(private customersRepository: ICustomerRepository) {}

  public async add(data: CreateCustomerDTO): Promise<CustomerDTO> {
    return await this.customersRepository.save(CustomerFactory.create(data));
  }

  public async find(filter: CustomerFilterDTO): Promise<CustomerDTO[]> {
    return await this.customersRepository.find(filter);
  }

  public async delete(id: string): Promise<CustomerDTO> {
    return await this.customersRepository.delete(id);
  }
}
