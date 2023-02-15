import { ICustomerRepository } from '@/application/ports';
import { Customer } from '@/core/entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerDTO, CustomerFilterDTO } from '@/shared/dtos';

@Injectable()
export class CustomersRepository implements ICustomerRepository {
  constructor(private prisma: PrismaService) {}

  public async save(entity: Customer): Promise<CustomerDTO> {
    return await this.prisma.customer.create({
      data: {
        id: entity.getId(),
        name: entity.getName(),
        userId: entity.getUserId(),
      },
    });
  }

  public async find(filter: CustomerFilterDTO): Promise<CustomerDTO[]> {
    return await this.prisma.customer.findMany({
      where: {
        AND: [
          { id: filter.id ? { equals: filter.id } : undefined },
          { name: filter.name ? { equals: filter.name } : undefined },
          { userId: filter.userId ? { equals: filter.userId } : undefined },
          {
            createdAt: filter.createdBetween
              ? {
                  gte: filter.createdBetween[0],
                  lte: filter.createdBetween[1],
                }
              : undefined,
          },
        ],
      },
    });
  }

  // public async getById(id: string): Promise<CustomerDTO> {
  //   return await this.prisma.customer.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // public async getAll(): Promise<CustomerDTO[]> {
  //   return await this.prisma.customer.findMany();
  // }

  public async delete(id: string): Promise<CustomerDTO> {
    return await this.prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}
