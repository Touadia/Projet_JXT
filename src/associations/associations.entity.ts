import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    public id : number
    @ManyToMany(type => User, { eager: true })
    @JoinTable()
    users: User[]
    @Column()
    public name : string
    //constructor(idUsers, name) { <- not needed anymore since we are using typeORM
}