import { Controller, Get, Post, Body, UseFilters, UseGuards, Request, } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcript from 'bcrypt';
import { MongoExceptionFilter } from '../../utils/mongoExceptionFilter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/client/register')
  @UseFilters(MongoExceptionFilter)
  @ApiResponse({ status: 200, description: 'The user has been created', type: User })
  async singup(@Body() data: CreateUserDto): Promise<Partial<User>> {
    const { email, password, name, contactPhone } = data;
    const passwordHash = bcript.hashSync(password, 10);

    return this.authService.signup({ email, passwordHash, name, contactPhone });
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'login' })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);;
  }


  @Get('/auth/logout')
  @ApiResponse({ status: 200, description: 'logout' })
  logout(@Request() req) {
    req.logout();
    return { status: 'logout' };
  }

}
