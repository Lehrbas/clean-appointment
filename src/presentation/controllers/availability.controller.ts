import { Get, Controller, Post, Delete, Body } from '@nestjs/common';

import { AvailabilityDTO, AvailabilityFilterDTO } from '@/shared/dtos';
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
  async create(@Body() data: AvailabilityDTO): Promise<BaseResponse> {
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

  // @Put(':id')
  // update(@Param('id') id: string, @Body() user: User): Promise<void> {
  //   return this.AuthService.update(id, user);
  // }

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
