import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm';

@Injectable()
export class SchoolRepository {
  static getProviderForSchool<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'SchoolEntityRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getProviderForClass<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'ClassEntityRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getProviderForTeachers<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'TeachersEntityRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getProviderForParents<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'ParentsEntityRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getProviderForStudents<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'StudentsEntityRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getName<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
    return pascalCaseToSnakeCase(entity['name']).toUpperCase();
  }
  static generateDataSources = (options: DataSourceOptions[]) => {
    return options.map((v) => {
      return {
        provide: 'DATA_SOURCE',
        useFactory: () => new DataSource(v).initialize(),
      };
    });
  };
}

const pascalCaseToSnakeCase = (str: string) =>
  str
    .split(/\.?(?=[A-Z])/)
    .join('_')
    .toLowerCase();
