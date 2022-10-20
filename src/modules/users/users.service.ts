import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../../id.type';
import { IUserService, SearchUserParams } from './interfaces';
import { User, UserDocument } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { searchFilters } from '../../utils/helpers';



@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) { }

  async findByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email: email }).lean();
  }

  async create(data: Partial<User>): Promise<Omit<User, 'passwordHash'>> {
    const _id = new mongoose.Types.ObjectId();
    const { email, passwordHash, name, contactPhone, role } = data;
    const newUser = new this.UserModel({
      _id,
      email,
      passwordHash,
      name,
      contactPhone,
      role,
    });

    await newUser.save();
    return { _id, email, name, contactPhone, role };
  }

  async findById(id: ID): Promise<Partial<User>> {
    const user = await this.UserModel.findById(id);
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    };
  }

  async findAll(params: SearchUserParams): Promise<Partial<User[]>> {
    const { limit, offset } = params;
    const filters = searchFilters(params);
    const users = await this.UserModel.find({
      ...filters,
    })
      .skip(offset)
      .limit(limit)
      .select('_id email name contactPhone');
    return users;
  }
}
