import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getData(): { message: string } {
    // this.prismaService.user.
    return { message: 'Hello API2' };
  }
}
