import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id : number
    @Column()
    public name: string; 
    //@PrimaryColumn()        // <- can't have multiple primary keys, so nocomposite keys (apparently) on sqlite3
    @Column()   
    public user : number
    //@PrimaryColumn()
    @Column()
    public association : number
} 