import { Get, Controller, Post, Delete, Body } from '@nestjs/common';

import { CreateCustomerDTO, CustomerFilterDTO } from '@/shared/dtos';
import { CustomerService } from '@/application/services';

import { BaseResponse } from '@/shared/response/base-response';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Get()
  // async getAll(): Promise<BaseResponse> {
  //   try {
  //     const customerList = this.customerService.getAll();
  //     return {
  //       status: 200,
  //       message: 'Customers found: ',
  //       data: customerList,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       data: error.message,
  //     };
  //   }
  // }

  // @Get()
  // async getById(@Body('id') id: string): Promise<BaseResponse> {
  //   try {
  //     const customer = await this.customerService.getById(id);
  //     return { status: 200, message: 'Customer found: ', data: customer };
  //   } catch (error) {
  //     return { status: 500, message: 'error', data: error.message };
  //   }
  // }

  @Get()
  async find(@Body() filter: CustomerFilterDTO): Promise<BaseResponse> {
    try {
      return {
        status: 200,
        message: 'Customer found:',
        data: await this.customerService.find(filter),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Post()
  async create(@Body() customerData: CreateCustomerDTO): Promise<BaseResponse> {
    try {
      const savedCustomer = await this.customerService.add(customerData);
      return {
        status: 200,
        message: 'Customer created: ',
        data: savedCustomer,
      };
    } catch (error) {
      return { status: 500, message: 'error: ', data: error.message };
    }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() user: User): Promise<void> {
  //   return this.AuthService.update(id, user);
  // }

  @Delete()
  async delete(@Body('id') id: string): Promise<BaseResponse> {
    try {
      const deletedCustomer = await this.customerService.delete(id);
      return {
        status: 200,
        message: 'Customer deleted: ',
        data: deletedCustomer,
      };
    } catch (error) {
      return {
        status: 500,
        data: error.message,
      };
    }
  }
}
