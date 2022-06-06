import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Role } from './roles.entity';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';

var len = 0;

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>,
        private usersService: UsersService,
        private assoService: AssociationsService,
    ) {}

    public async read(id1: number, id2: number) : Promise<Role>{
        const fRole: Role = await this.repository.findOne({where:{user: id1, association: id2}});
        if (fRole !=null && fRole.user === id1 && fRole.association === id2) {
            return fRole;
        }
        return undefined;
    }
    
    public async create(name: string, user: number, association: number) : Promise<Role>{
        if ((await this.usersService.getById(user)) === undefined || (await this.assoService.read(association)) === undefined) return undefined; // <- checks if both user and asso exist before making a role
        const newRole = await this.repository.create({
            id: len, 
            name: name, 
            user: user, 
            association: association
        })
        len = len+1;
        await this.repository.save(newRole);
        return newRole;
    }

}
