import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
})
export class UsersModules {}
