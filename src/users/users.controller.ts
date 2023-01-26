import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorType, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Res() response: Response) {
    response.json(await this.userService.getUsers());
  }

  @Get(':id')
  async findBy(@Param() params: { id: string }, @Res() response: Response) {
    const result = await this.userService.getUserById(params.id);

    if (result === ErrorType.BAD_REQUEST) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    if (result === ErrorType.NOT_FOUND) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    response.json(result);
  }
}
