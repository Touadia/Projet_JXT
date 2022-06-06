import { Injectable, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { unwatchFile } from 'fs';

var len = 0;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    public async getAll() : Promise<User[]>{
        return this.repository.find();
    }

    public async create(lastname: string, firstname: string, age: number, password_string: string) : Promise<User>{
        const password: string = password_string;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.repository.create({
            id: len, 
            lastname: lastname, 
            firstname: firstname, 
            age: age,
            password: hash
        })
        len = len+1;
        await this.repository.save(newUser);
        return newUser;
    }

    public async getById(idToFind: number): Promise<User> {
        const fUser = await this.repository.findOne({where:{id: idToFind}});
        if (fUser.id === idToFind) {
            return fUser;
        }
        return undefined;
    
    }

    public async update(id: number,  lastname: string, firstname: string, age: number, password_string: string) : Promise<User>{
        if (firstname !== undefined){await this.repository.update(id, { firstname: firstname });}
        if (lastname !== undefined){await this.repository.update(id, { lastname: lastname });}
        if (age !== undefined){await this.repository.update(id, { age: age });}
        const password: string = password_string;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        if (password !== undefined){await this.repository.update(id, { password: password });}
        return this.getById(id);
    }

    public async delete(id: number) : Promise<Boolean>{
        const dUser = await this.getById(id);
        if (dUser === undefined || dUser.id != id) return false;
        await this.repository.delete(id)
        return true;
    }
}
