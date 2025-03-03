import { UserInterface } from './user.interface';
export interface UserCreatableInterface
  extends Pick<
    UserInterface,
    'firstName' | 'lastName' | 'username' | 'password' | 'email'
  > {}
