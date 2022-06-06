import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id : number
    @Column()
    public lastname : string
    @Column()
    public firstname : string
    @Column()
    public age: number;
    @Column()
    public password: string = "valid_password";
}