import { positionName } from './positions.interface';

export interface User {
  photo: string;
  id: number;
  email: string;
  password: string;
  phone: string;
  name: string;
  position_id: number;
}

export interface FinalUser extends User {
  position: positionName;
}
