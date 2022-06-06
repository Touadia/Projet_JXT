import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Association])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports: [AssociationsService],
})
export class AssociationsModule {}