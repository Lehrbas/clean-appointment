import { Get, Controller, Post, Delete, Body } from '@nestjs/common';

import { AppointmentDTO, AppointmentFilterDTO } from '@/shared/dtos';
import { AppointmentService } from '@/application/services';

import { BaseResponse } from '@/shared/response/base-response';

@Controller('api/appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async find(@Body() filter: AppointmentFilterDTO): Promise<BaseResponse> {
    try {
      return {
        status: 200,
        message: 'Appointments found:',
        data: await this.appointmentService.find(filter),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Post()
  async create(@Body() data: AppointmentDTO): Promise<BaseResponse> {
    try {
      const savedAppointment = await this.appointmentService.add(data);
      return {
        status: 201,
        message: 'Appointment created: ',
        data: savedAppointment,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'error:',
        data: error.message,
      };
    }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() user: User): Promise<void> {
  //   return this.AuthService.update(id, user);
  // }

  @Delete()
  async delete(@Body('id') id: string): Promise<BaseResponse> {
    try {
      const deletedAppointment = await this.appointmentService.delete(id);

      return {
        status: 200,
        message: 'Appointment deleted',
        data: deletedAppointment,
      };
    } catch (error) {
      return { status: 500, data: error.message };
    }
  }
}
