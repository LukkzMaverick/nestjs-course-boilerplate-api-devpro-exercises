import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  public users: User[];
  constructor() {
    this.users = [];
  }

  private convertToUser(createUser: CreateUserDto): User {
    const user = new User();
    user.username = createUser.username;
    user.password = createUser.password;
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.email = createUser.email;
    user.active = true;
    user.id = randomUUID();
    return user;
  }

  private returnUser(user: Partial<User>): Partial<User> {
    const retUser = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.active,
      id: user.id,
    };
    return retUser;
  }

  public create(createUser: CreateUserDto): Partial<User> {
    const user = this.convertToUser(createUser);
    this.users.push(user);
    return this.returnUser(user);
  }

  public findAll() {
    return this.users.map((user) => {
      return this.returnUser(user);
    });
  }

  public findOne(id: string): Partial<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return this.returnUser(user);
  }

  public update(id: string, updateUserDto: UpdateUserDto): Partial<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;
    return this.returnUser(user);
  }

  public remove(id: string) {
    const index = this.users.findIndex((prop) => prop.id === id);
    if (index < 0) throw new NotFoundException();
    this.users.splice(index, 1);
  }
}
