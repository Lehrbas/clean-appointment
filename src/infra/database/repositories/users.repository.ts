import { IUserRepository } from '@/application/ports';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDTO, UserFilterDTO } from '@/shared/dtos';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  public async save(entity: User): Promise<UserDTO> {
    const user = await this.prisma.user.create({
      data: {
        id: entity.getId(),
        email: entity.getEmail(),
        password: entity.getPassword(),
        role: entity.getRole(),
      },
    });

    return user;
  }

  public async find(filter: UserFilterDTO): Promise<UserDTO[]> {
    return await this.prisma.user.findMany({
      where: {
        AND: [
          { id: filter.id ? { equals: filter.id } : undefined },
          { email: filter.email ? { equals: filter.email } : undefined },
          { role: filter.role ? { equals: filter.role } : undefined },
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

  public async delete(id: string): Promise<UserDTO> {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
