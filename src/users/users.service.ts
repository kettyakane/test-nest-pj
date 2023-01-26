import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface User {
  id: number;
  email: string;
  name: string;
}

export enum ErrorType {
  NOT_FOUND,
  BAD_REQUEST,
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(id: string): Promise<User | ErrorType> {
    if (!Number(id)) {
      return ErrorType.BAD_REQUEST;
    }

    const user = await this.prisma.user.findFirst({
      where: { id: Number(id) },
    });

    if (!user) {
      return ErrorType.NOT_FOUND;
    }

    return user;
  }
}
