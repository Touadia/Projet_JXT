import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { Repository } from 'typeorm';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        AssociationsService,
        { provide: getRepositoryToken(Association), useFactory: repositoryMockFactory}
      ]
    }).compile();

    controller = module.get<AssociationsController>(AssociationsController);
    service = module.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNewAssociation', () => {
    it('should return a newly created association', async () => {
      const expected = await Promise.all([{ 
          id: 0,
          users: [],
          name: 'Asso0'
      }]);
      jest.spyOn(service, 'create').mockImplementation((users , name )=> {
        return Promise.resolve({
          id: 0,
          users: [],
          name: 'Asso0'
        });
      });
      expect(await controller.createNewAssociation({users: [], name: "Asso0" })).toStrictEqual(expected[0]);
    });
  });

  describe('getAll', () => {
    it('should return all the associations', async () => {
      const expected = Promise.all([{ 
          id: 0,
          users: [],
          name: 'Asso0'
      }]);
      jest.spyOn(service, 'get_all_associations').mockImplementation(()=> expected);
      expect(await controller.getAll()).toStrictEqual(await expected);
    });
  });
    
  describe('getMembers', () => {
    it('should return the members of an association', async () => {
      const expected = Promise.all([{ 
        id: 0, 
        lastname: 'Doe',
        firstname: 'John',
        age: 23,
        password: "0"
      }]);
      jest.spyOn(service, 'read_all').mockImplementation((id )=> {
        return Promise.all([{ 
          id: 0, 
          lastname: 'Doe',
          firstname: 'John',
          age: 23,
          password: "0"
      }]);
      });
      expect(await controller.getMembers({id: 0 })).toStrictEqual(await expected);
    });
  });

  describe('getById', () => {
    it('should return one associations', async () => {
      const expected = await Promise.all([{ 
          id: 0,
          users: [],
          name: 'Asso0'
      }]);
      jest.spyOn(service, 'read').mockImplementation(id => {
        return Promise.resolve({ 
          id: 0,
          users: [],
          name: 'Asso0'
      });
      });
      expect(await controller.read_C({id: 0})).toStrictEqual(expected[0]);
    });
  });

  describe('updateById', () => {
    it('should return a newly modified association', async () => {
      const expected = await Promise.all([{ 
          id: 0,
          users: [],
          name: 'Asso0-v2'
      }]);
      jest.spyOn(service, 'update').mockImplementation(id => {
        return Promise.resolve({ 
          id: 0,
          users: [],
          name: 'Asso0-v2'
      });
      });
      expect(await controller.update_C({id: 0}, {users: [], name: "Asso0-v2"})).toStrictEqual(expected[0]);
    });
  });

  describe('deleteById', () => {
    it('should return a newly modified association', async () => {
      const expected = Promise.resolve(true);
      jest.spyOn(service, 'delete').mockImplementation(id => expected);
      expect(await controller.delete_C({id: 0})).toStrictEqual(await expected);
    });
  });

});
