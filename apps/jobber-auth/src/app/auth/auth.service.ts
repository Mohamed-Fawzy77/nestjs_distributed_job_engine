import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcryptjs';
import { UserPayload } from './user-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput, res: Response) {
    const user = await this.verifyAndGetUser(
      loginInput.email,
      loginInput.password
    );

    const payload: UserPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('Authorization', token, {
      secure: true,
      httpOnly: true,
    });

    return user;
  }
  async verifyAndGetUser(email: string, password: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      });

      await compare(password, user.password);

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
