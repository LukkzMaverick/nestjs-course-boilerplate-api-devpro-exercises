import { UserInterface } from './../interfaces/user.interface';
export class UserDto implements UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  salt: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
