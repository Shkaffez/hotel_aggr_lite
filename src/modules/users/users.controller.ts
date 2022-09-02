import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { SearchUsersDto } from './dto/searchUsers.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../utils/roles.decorator';
import { Role } from '../../utils/role.enum';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';


@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/admin/users/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateUserDto })
  public create(@Body() data: CreateUserDto) {
    const { email, password, name, contactPhone, role } = data;
    const passwordHash = bcrypt.hashSync(password, 10);
    return this.usersService.create({
      email,
      passwordHash,
      name,
      contactPhone,
      role,
    });
  }

  @Get('/admin/users/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  public findAsAdmin(@Query() query: SearchUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get('/manager/users/')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  public findAsManager(@Query() query: SearchUsersDto) {
    return this.usersService.findAll(query);
  }
}
