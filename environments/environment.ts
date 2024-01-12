import { entitiesToInject } from '../entities/school.entity';
import { SchoolRepository } from '../typeorm-helpers/typeorm-helper';
import { DataSourceOptions } from 'typeorm';

export const postgresLocalConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'school',
  entities: entitiesToInject,
  synchronize: true,
};

export const environment = {
  dataSources: SchoolRepository.generateDataSources([postgresLocalConfig]),
  entityProviders: [
    SchoolRepository.getProviderForSchool(entitiesToInject[0]),
    SchoolRepository.getProviderForClass(entitiesToInject[1]),
    SchoolRepository.getProviderForParents(entitiesToInject[2]),
    SchoolRepository.getProviderForStudents(entitiesToInject[3]),
    SchoolRepository.getProviderForTeachers(entitiesToInject[4]),
  ],
  schoolUrl: 'http://localhost:3000',
};
