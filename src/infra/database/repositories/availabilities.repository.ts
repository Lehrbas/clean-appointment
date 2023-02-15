import { IAvailabilityRepository } from '@/application/ports/availabilities.repository.port';
import { Availability } from '@/core/entities';
import {
  AvailabilityDTO,
  AvailabilityFilterDTO,
  UpdateAvailabilityDTO,
} from '@/shared/dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AvailabilitiesRepository implements IAvailabilityRepository {
  constructor(private prisma: PrismaService) {}

  // Save a single availability
  // Not used in the moment, but it is here for future use
  public async save(entity: Availability): Promise<AvailabilityDTO> {
    return await this.prisma.availability.create({
      data: {
        id: entity.getId(),
        startsAt: entity.getStartsAt(),
        endsAt: entity.getEndsAt(),
        professionalId: entity.getProfessionalId(),
      },
    });
  }

  // Bulk insert for availabilities
  public async saveMany(entities: Availability[]): Promise<AvailabilityDTO[]> {
    await this.prisma.availability.createMany({
      data: entities.map((entity) => ({
        id: entity.getId(),
        startsAt: entity.getStartsAt(),
        endsAt: entity.getEndsAt(),
        professionalId: entity.getProfessionalId(),
      })),
    });

    // Map the batchPayload to an array of AvailabilityDTO objects
    return entities.map((entity) => ({
      id: entity.getId(),
      startsAt: entity.getStartsAt(),
      endsAt: entity.getEndsAt(),
      professionalId: entity.getProfessionalId(),
    }));
  }

  public async find(filter: AvailabilityFilterDTO): Promise<AvailabilityDTO[]> {
    return await this.prisma.availability.findMany({
      where: {
        AND: [
          { id: filter.id ? { equals: filter.id } : undefined },
          {
            professionalId: filter.professionalId
              ? { equals: filter.professionalId }
              : undefined,
          },
          {
            startsAt: filter.startsAt ? { equals: filter.startsAt } : undefined,
          },
          {
            endsAt: filter.endsAt ? { equals: filter.endsAt } : undefined,
          },
          filter.isBetween
            ? {
                startsAt: { gte: filter.isBetween[0] },
                endsAt: { lte: filter.isBetween[1] },
              }
            : undefined,
        ],
      },
    });
  }

  public async update(data: UpdateAvailabilityDTO): Promise<AvailabilityDTO> {
    return await this.prisma.availability.update({
      where: {
        id: data.id,
      },
      data: {
        startsAt: data.startsAt,
        endsAt: data.endsAt,
      },
    });
  }

  public async delete(id: string): Promise<AvailabilityDTO> {
    return await this.prisma.availability.delete({
      where: {
        id: id,
      },
    });
  }
}
