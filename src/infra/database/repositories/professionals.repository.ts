import { IProfessionalRepository } from '@/application/ports/professionals.repository.port';
import { Professional } from '@/core/entities';
import { ProfessionalDTO, ProfessionalFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfessionalsRepository implements IProfessionalRepository {
  constructor(private prisma: PrismaService) {}

  public async save(entity: Professional): Promise<ProfessionalDTO> {
    return await this.prisma.professional.create({
      data: {
        id: entity.getId(),
        name: entity.getName(),
        field: entity.getField(),
        userId: entity.getUserId(),
      },
    });
  }

  public async find(filter: ProfessionalFilterDTO): Promise<ProfessionalDTO[]> {
    return await this.prisma.professional.findMany({
      where: {
        AND: [
          { id: filter.id ? { equals: filter.id } : undefined },
          { name: filter.name ? { equals: filter.name } : undefined },
          { field: filter.field ? { equals: filter.field } : undefined },
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

  public async getById(id: string): Promise<ProfessionalDTO> {
    return await this.prisma.professional.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async delete(id: string): Promise<ProfessionalDTO> {
    return await this.prisma.professional.delete({
      where: {
        id: id,
      },
    });
  }
}
