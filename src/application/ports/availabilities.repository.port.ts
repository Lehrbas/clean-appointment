// Defines port for availabilities repository

import { Availability } from '@/core/entities/availability';
import { IRepository } from '../abstract/repository';
import { AvailabilityDTO, AvailabilityFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IAvailabilityRepository extends IRepository<
  Availability,
  AvailabilityFilterDTO,
  AvailabilityDTO
> {
  abstract saveMany(entities: Availability[]): Promise<AvailabilityDTO[]>;
}
