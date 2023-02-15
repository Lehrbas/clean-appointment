// Implementation of factory for entity Appointment

import { Availability } from '../../core/entities';
import { AvailabilityDTO } from '@/shared/dtos';

export class AvailabilityFactory {
  public static create(data: AvailabilityDTO): Availability {
    return new Availability({
      ...data,
    });
  }
}
