import { IAppointmentRepository } from '@/application/ports';
import { Appointment } from '@/core/entities';
import { AppointmentDTO, AppointmentFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsRepository implements IAppointmentRepository {
  constructor(private prisma: PrismaService) {}

  public async save(entity: Appointment): Promise<AppointmentDTO> {
    return await this.prisma.appointment.create({
      data: {
        id: entity.getId(),
        startsAt: entity.getStartsAt(),
        endsAt: entity.getEndsAt(),
        status: entity.getStatus(),
        customerId: entity.getCustomerId(),
        professionalId: entity.getProfessionalId(),
      },
    });
  }

  public async find(filter: AppointmentFilterDTO): Promise<AppointmentDTO[]> {
    return await this.prisma.appointment.findMany({
      where: {
        AND: [
          { id: filter.id ? { equals: filter.id } : undefined },
          {
            professionalId: filter.professionalId
              ? { equals: filter.professionalId }
              : undefined,
          },
          {
            customerId: filter.customerId
              ? { equals: filter.customerId }
              : undefined,
          },
          { status: filter.status ? { equals: filter.status } : undefined },
          {
            startsAt: filter.startsAt ? { gte: filter.startsAt } : undefined,
          },
          {
            endsAt: filter.endsAt ? { lte: filter.endsAt } : undefined,
          },
          filter.isBetween
            ? {
                startsAt: { gte: filter.isBetween[0] },
                endsAt: { lte: filter.isBetween[1] },
              }
            : null,
        ],
      },
    });
  }

  public async delete(id: string): Promise<AppointmentDTO> {
    return await this.prisma.appointment.delete({
      where: {
        id: id,
      },
    });
  }
}
