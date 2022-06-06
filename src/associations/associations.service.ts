import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity'
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

var len = 1;

@Injectable()
export class AssociationsService {
    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>
    ) {}

    public async get_all_associations(): Promise<Association[]>{
        return this.repository.find();
    };

    public async create(users: User[], name: string) : Promise<Association>{
        const newAsso = await this.repository.create({
            id: len, 
            users: users, 
            name: name, 
        })
        len = len+1;
        await this.repository.save(newAsso);
        return newAsso;
    }

    public async read(idToFind: number) : Promise<Association>{
        const fAsso = await this.repository.findOne({
            where: {
                id: Equal(idToFind),
            },
        })
        if (fAsso.id === idToFind) {
            return fAsso;
        }
        return undefined;
    }

    public async read_all(id: number) : Promise<User[]>{
        const fAsso = await this.repository.findOne({
            where: {
                id: Equal(id),
            },
        })
        return fAsso.users
    }

    public async update(id: number, users: User[], name: string) : Promise<Association>{
        if (id !== undefined)await this.repository.update(id, { id: id });
        if (users !== undefined)await this.repository.update(id, { users: users });
        if (name !== undefined)await this.repository.update(id, { name: name });
        return this.read(id);
    }

    public async delete(id: number) : Promise<Boolean>{
        const dAsso = this.read(id);
        if (dAsso != null){
            await this.repository.delete(id);
            return true;
        }
        return false;
    }
}
