// Implementation of factory for entity Appointment

import { Appointment } from '../../core/entities';
import { AppointmentDTO } from '@/shared/dtos';

export class AppointmentFactory {
  public static create(data: AppointmentDTO): Appointment {
    const appoint = new Appointment({
      status: 'AW',
      ...data,
    });
    console.log('#####appointment factory######');
    console.log(appoint);
    return appoint;
  }
}
