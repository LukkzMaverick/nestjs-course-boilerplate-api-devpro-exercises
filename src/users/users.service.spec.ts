import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe(UsersService, () => {
  let usersService: UsersService;
  const user: CreateUserDto = {
    username: 'Lucas',
    password: '123456',
    firstName: 'Lucas',
    lastName: 'Cunha',
    email: 'lucas@gmail.com',
  };

  const userWithoutPassword: Partial<User> = {
    username: 'Lucas',
    firstName: 'Lucas',
    lastName: 'Cunha',
    email: 'lucas@gmail.com',
  };

  const id = '123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe(UsersService.prototype.create, () => {
    it('should create a user.', () => {
      const result = usersService.create(user);

      expect(result).toMatchObject(userWithoutPassword);
      expect(result.id).toBeDefined();
    });
  });

  describe(UsersService.prototype.update, () => {
    it('should update a user', () => {
      let result = usersService.create(user);
      const firstName = 'John';
      const lastName = 'Doe';
      result = usersService.update(result.id, {
        firstName,
        lastName,
      });
      const updatedUser = { ...userWithoutPassword, firstName, lastName };
      expect(result.id).toBeDefined();
      expect(result).toMatchObject(updatedUser);
    });

    it('should throw NotFoundException', () => {
      const func = () => {
        usersService.update(id, new UpdateUserDto());
      };
      expect(func).toThrow(NotFoundException);
    });
  });

  describe(UsersService.prototype.findOne, () => {
    it('should find a user', () => {
      const result1 = usersService.create(user);
      const result2 = usersService.findOne(result1.id);
      expect(result2.id).toBe(result1.id);
    });

    it('should throw NotFoundException', () => {
      const func = () => {
        usersService.findOne(id);
      };
      expect(func).toThrow(NotFoundException);
    });
  });

  describe(UsersService.prototype.findAll, () => {
    it('should return an empty array', () => {
      const result = usersService.findAll();
      expect(result.length).toBe(0);
    });

    it('should return 2 users', () => {
      usersService.create(user);
      usersService.create(user);
      const result = usersService.findAll();
      expect(result.length).toBe(2);
    });
  });

  describe(UsersService.prototype.remove, () => {
    it('should delete a user', () => {
      const result = usersService.create(user);
      const result2 = usersService.remove(result.id);
      expect(result2).toBeUndefined();
      const funcFind = () => usersService.findOne(result.id);
      expect(funcFind).toThrow(NotFoundException);
    });

    it('should Throw NotFoundExpeception', () => {
      const func = () => {
        usersService.remove(id);
      };
      expect(func).toThrow(NotFoundException);
    });
  });

  describe(UsersService.prototype['convertToUser'], () => {
    it('should return a instace of user', () => {
      const result = usersService['convertToUser'](user);
      expect(result).toBeInstanceOf(User);
    });
  });
});
