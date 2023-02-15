import { AppointmentDTO, AppointmentFilterDTO } from '@/shared/dtos';
import { AppointmentFactory } from '../factories';
import { IAppointmentRepository } from '../ports';
import { ProfessionalService } from './professional.service';
import { CustomerService } from './customer.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  constructor(
    private appointmentsRepository: IAppointmentRepository,
    private customerService: CustomerService,
    private professionalService: ProfessionalService,
  ) {}

  public async add(data: AppointmentDTO): Promise<AppointmentDTO> {
    const professional = await this.professionalService.find({
      id: data.professionalId,
    });
    const customer = await this.customerService.find({ id: data.customerId });

    if (
      professional == undefined ||
      customer.length == undefined ||
      professional.length == 0 ||
      customer.length == 0
    ) {
      throw new Error('Professional or customer id does not exist on database');
    }

    return this.appointmentsRepository.save(AppointmentFactory.create(data));
  }

  public async find(filter: AppointmentFilterDTO): Promise<AppointmentDTO[]> {
    return await this.appointmentsRepository.find(filter);
  }

  public async delete(id: string): Promise<AppointmentDTO> {
    return await this.appointmentsRepository.delete(id);
  }
}
