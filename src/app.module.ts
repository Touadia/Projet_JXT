import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Association } from './associations/associations.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';


@Module({
  imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'mydatabase.db',
          entities: [User, Association, Role],
          synchronize: true,
        }),UsersModule, AssociationsModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
