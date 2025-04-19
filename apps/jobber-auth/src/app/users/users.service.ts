import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/jobber-auth';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  getUsers() {
    return this.prismaService.user.findMany();
  }
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash('asd', 10),
      },
    });
  }

  // async updateUser(data: Prisma.UserUpdateInput) {}
}
