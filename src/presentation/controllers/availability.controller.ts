import { Get, Controller, Post, Delete, Body, Put } from '@nestjs/common';

import {
  AvailabilityFilterDTO,
  CreateAvailabilityDTO,
  UpdateAvailabilityDTO,
} from '@/shared/dtos';
import { AvailabilityService } from '@/application/services';

import { BaseResponse } from '@/shared/response/base-response';

@Controller('api/availabilities')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  async find(@Body() filter: AvailabilityFilterDTO): Promise<BaseResponse> {
    try {
      return {
        status: 200,
        message: 'Availabilities found:',
        data: await this.availabilityService.find(filter),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Post()
  async create(@Body() data: CreateAvailabilityDTO): Promise<BaseResponse> {
    try {
      const savedAvailability = await this.availabilityService.add(data);
      return {
        status: 200,
        message: 'Availability created: ',
        data: savedAvailability,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error.message,
      };
    }
  }

  @Put()
  async update(@Body() data: UpdateAvailabilityDTO): Promise<BaseResponse> {
    try {
      const updatedAvailability = await this.availabilityService.update(data);

      return {
        status: 200,
        message: 'Availability updated: ',
        data: updatedAvailability,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error.message,
      };
    }
  }

  @Delete()
  async delete(@Body('id') id: string): Promise<BaseResponse> {
    try {
      const availability = await this.availabilityService.delete(id);

      return {
        status: 200,
        message: 'Availability deleted: ',
        data: availability,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error.message,
      };
    }
  }
}
