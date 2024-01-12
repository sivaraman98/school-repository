import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SchoolEntity, entitiesToInject } from '../entities/school.entity';
import { environment } from '../environments/environment';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    ...environment.entityProviders,
    ...environment.dataSources,
  ],
})
export class AppModule {}
