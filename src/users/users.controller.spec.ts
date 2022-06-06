import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([{ 
          id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password: "0"
      }]);
      jest.spyOn(service, 'getAll').mockImplementation(() => expected);
      expect(await controller.getAll()).toBe(await expected);
    });
  });

  describe('getById', () => {

    it('should return a single user, with the provided id', async () => {
      const expected =await Promise.all([{  
        id: 0, 
        lastname: 'Doe',
        firstname: 'John',
        age: 23,
        password: "0"
      }]);
      jest.spyOn(service, 'getById').mockImplementation(id => {
        return Promise.resolve({ 
          id: 0, 
          lastname: 'Doe',
          firstname: 'John',
          age: 23,
          password: "0"
      });
      });
      expect(await controller.getById({id: 0})).toStrictEqual( expected[0]); // <- changed to toStrictEqual from toBe becquse Equal checks the key values from both objects instead of toBe which is basically ====
    })
  });

  describe('createNewUser', () => {

    it('should return a single newly created user.', async () => {
      const expected = await Promise.all([{  
        id: 0, 
        lastname: 'Doe',
        firstname: 'John',
        age: 23,
        password: "0"
      }]);
      jest.spyOn(service, 'create').mockImplementation((lastname, firstname, age )=> {
        return Promise.resolve({ 
          id: 0, 
          lastname: 'Doe',
          firstname: 'John',
          age: 23,
          password: "0"
      });
      });
      expect(await controller.createNewUser({lastname: 'Doe', firstname: 'John', age: 23, password: "m1"})).toStrictEqual(expected[0]);
    })

  describe('modifById', () => {

    it('should return a single modified user.', async () => {
      const expected = await Promise.all([{  
        id: 0, 
        lastname: 'Doe',
        firstname: 'Jane',
        age: 23,
        password: "0"
      }]);
      jest.spyOn(service, 'update').mockImplementation((id, lastname, firstname, age )=> {
        return Promise.resolve({ 
          id: 0, 
          lastname: 'Doe',
          firstname: 'Jane',
          age: 23,
          password: "0"
      });
      });
      expect(await controller.modifById({ id: 0}, {lastname: 'Doe', firstname: 'Jane', age: 23, password: "m1"} )).toStrictEqual(expected[0]);
    })
    });

})

describe('deleteById', () => {

  it('should return a single modified user.', async () => {
    const expected = Promise.resolve(true);
    jest.spyOn(service, 'delete').mockImplementation(id => expected);
    expect(await controller.deleteById({ id: 0})).toStrictEqual(await expected);
  })
  });

});