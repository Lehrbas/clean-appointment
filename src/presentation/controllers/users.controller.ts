import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { UserService } from '@/application/services/user.service';
import { BaseResponse } from '@/shared/response/base-response';
import { UserDTO, UserFilterDTO } from '@/shared/dtos';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(@Body() filter: UserFilterDTO): Promise<BaseResponse> {
    try {
      return {
        status: 200,
        message: 'User found:',
        data: await this.userService.find(filter),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Post()
  async create(@Body() userData: UserDTO): Promise<BaseResponse> {
    try {
      const user = await this.userService.add(userData);
      return { status: 200, message: 'User found:', data: user };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() user: User): Promise<void> {
  //   return this.userService.update(id, user);
  // }

  @Delete()
  async delete(@Body('id') id: string): Promise<BaseResponse> {
    try {
      const user = await this.userService.delete(id);
      return { status: 200, message: 'User deleted:', data: user };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
