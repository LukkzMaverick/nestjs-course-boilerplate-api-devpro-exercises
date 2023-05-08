import { UserUpdatableInterface } from './../interfaces/user-updatable.interface';

export class UpdateUserDto implements UserUpdatableInterface {
  firstName?: string;
  lastName?: string;
  active?: boolean;
}
