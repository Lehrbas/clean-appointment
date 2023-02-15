/* 
  Basic tests for the factories
  The factories are responsible for creating the entities
  This tests can be further improved by testing the validation of the inputs and the exceptions thrown
  They also can be broken into diferent files, one for each factory
  In this case I decided to keep them in the same file because they are very simple and this is a PoC
*/

import { CustomerFactory, ProfessionalFactory } from '../';
import { Customer, Professional } from '../../../core/entities';
import { CreateCustomerDTO, CreateProfessionalDTO } from '@/shared/dtos';

import { faker } from '@faker-js/faker';

describe('ProfessionalFactory', () => {
  it('creates a professional with all valid inputs', () => {
    const data: CreateProfessionalDTO = {
      name: faker.name.fullName(),
      field: faker.name.jobType(),
    };

    const professional = ProfessionalFactory.create(data);

    expect(professional).toBeInstanceOf(Professional);
    expect(professional.getUserId()).toBe(data.userId);
    expect(professional.getName()).toBe(data.name);
    expect(professional.getField()).toBe(data.field);
  });
});

describe('CustomerFactory', () => {
  it('creates a customer with all valid inputs', () => {
    const data: CreateCustomerDTO = {
      name: faker.name.fullName(),
    };

    const customer = CustomerFactory.create(data);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.getUserId()).toBe(undefined);
    expect(customer.getName()).toBe(data.name);
  });
});
