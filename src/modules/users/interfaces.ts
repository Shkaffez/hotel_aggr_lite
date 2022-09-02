import { User } from './schemas/user.schema';
import { ID } from '../../id.type';

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}
export interface IUserService {
  create(data: Partial<User>): Promise<Omit<User, 'passwordHash'>>;
  findById(id: ID): Promise<Partial<User>>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<Partial<User[]>>;
}
