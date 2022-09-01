import { ID } from '../id.type';
import { Hotel } from './schemas/hotel.schema';
import { HotelRoom } from './schemas/HotelRoom.schema';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelsParams): Promise<Hotel[]>;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  id: ID;
  isEnabled?: true;
}

export interface SearchHotelsParams {
  limit: number;
  offset: number;
}

export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
