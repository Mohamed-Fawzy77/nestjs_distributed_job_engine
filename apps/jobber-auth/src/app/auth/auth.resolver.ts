import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '../users/model/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('res') res: Response
  ) {
    return this.authService.login(loginInput, res);
  }
}
