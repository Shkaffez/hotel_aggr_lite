import { ID } from '../id.type';
import { Reservation } from './schemas/reservation.schema';

export interface Reservationdto {
  userId: ID;
  hotelId: ID;
  roomId: ID;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  userId: ID;
  dateStart: Date;
  dateEnd: Date;
}
export interface IReservation {
  addReservation(data: Reservationdto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
