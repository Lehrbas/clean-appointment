// Defines port for appointments repository

import { Appointment } from '@/core/entities/appointment';
import { IRepository } from '../abstract/repository';
import { AppointmentDTO, AppointmentFilterDTO } from '@/shared/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IAppointmentRepository extends IRepository<
  Appointment,
  AppointmentFilterDTO,
  AppointmentDTO
> {}
