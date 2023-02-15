import { Get, Controller, Post, Delete, Body } from '@nestjs/common';
import { CreateProfessionalDTO, ProfessionalFilterDTO } from '@/shared/dtos';
import { ProfessionalService } from '@/application/services';
import { BaseResponse } from '@/shared/response/base-response';

@Controller('api/professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get()
  async find(@Body() filter: ProfessionalFilterDTO): Promise<BaseResponse> {
    try {
      return {
        status: 200,
        message: 'Professionals found:',
        data: await this.professionalService.find(filter),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Post()
  async create(@Body() data: CreateProfessionalDTO): Promise<BaseResponse> {
    try {
      const savedProfessional = await this.professionalService.add(data);
      return {
        status: 200,
        message: 'Professional created: ',
        data: savedProfessional,
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
      const deletedProfessional = await this.professionalService.delete(id);
      return {
        status: 200,
        message: 'Professional deleted:',
        data: deletedProfessional,
      };
    } catch (error) {
      return { status: 500, data: error.message };
    }
  }
}
