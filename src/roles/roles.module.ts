import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Role } from './roles.entity';
import { RolesService } from './roles.services';
import { UsersModule } from 'src/users/users.module';
import { AssociationsModule } from 'src/associations/associations.module';


@Module({
  imports: [TypeOrmModule.forFeature([Role]), UsersModule, AssociationsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}