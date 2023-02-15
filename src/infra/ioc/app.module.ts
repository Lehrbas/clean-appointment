import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CustomerController,
  UserController,
  ProfessionalController,
  AppointmentController,
  AvailabilityController,
  SlotController,
} from '../../presentation/controllers';

import {
  UsersRepository,
  CustomersRepository,
  ProfessionalsRepository,
  AppointmentsRepository,
  AvailabilitiesRepository,
} from '../database/repositories';

import {
  UserService,
  CustomerService,
  ProfessionalService,
  AppointmentService,
  AvailabilityService,
  SlotService,
} from '../../application/services';

import {
  IUserRepository,
  ICustomerRepository,
  IProfessionalRepository,
  IAppointmentRepository,
  IAvailabilityRepository,
} from '../../application/ports';

import { LoggerService } from '../log/logger.service';

@Module({
  imports: [],
  controllers: [
    CustomerController,
    UserController,
    ProfessionalController,
    AppointmentController,
    AvailabilityController,
    SlotController,
  ],
  providers: [
    PrismaService,
    UsersRepository,
    CustomersRepository,
    ProfessionalsRepository,
    AppointmentsRepository,
    AvailabilitiesRepository,
    LoggerService,
    UserService,
    CustomerService,
    ProfessionalService,
    AppointmentService,
    AvailabilityService,
    SlotService,
    {
      provide: IUserRepository,
      useClass: UsersRepository,
    },
    {
      provide: ICustomerRepository,
      useClass: CustomersRepository,
    },
    {
      provide: IProfessionalRepository,
      useClass: ProfessionalsRepository,
    },
    {
      provide: IAppointmentRepository,
      useClass: AppointmentsRepository,
    },
    {
      provide: IAvailabilityRepository,
      useClass: AvailabilitiesRepository,
    },
  ],
})
export class AppModule {}
