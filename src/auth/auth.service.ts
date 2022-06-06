import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private service: UsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(id: number, password_string: string) : Promise<User> {
        const fUser = await this.service.getById(id);
       if (await bcrypt.compare(password_string, fUser.password)){
           return fUser;
       }
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}