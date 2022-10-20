import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Role } from '../../utils/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  public async signup(data: Partial<User>) {
    const _id = new mongoose.Types.ObjectId();
    const { email, passwordHash, name, contactPhone } = data;
    const newUser = new this.UserModel({
      _id,
      email,
      passwordHash,
      name,
      contactPhone,
    });
    await newUser.save();
    return {
      access_token: this.jwtService.sign({ _id: _id, email: email, name: name, role: Role.Client }, {
        secret: process.env.SECRET_KEY,
      })
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

    return {
      access_token: this.jwtService.sign({ _id: user._id, email: user.email, name: user.name, role: user.role }, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  async check(user: any) {
    return {
      access_token: this.jwtService.sign({ _id: user._id, email: user.email, name: user.name, role: user.role }, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }





}
