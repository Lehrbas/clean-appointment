import { Get, Controller, Body } from '@nestjs/common';
import { SlotsDTO } from '@/shared/dtos';
import { SlotService } from '@/application/services';
import { BaseResponse } from '@/shared/response/base-response';

@Controller('api/slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get()
  async findSlots(@Body() filter: SlotsDTO): Promise<BaseResponse> {
    try {
      const slots = await this.slotService.findSlots(filter);

      return {
        status: 200,
        message: 'Slots available: ',
        data: slots,
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
