import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm';

@Injectable()
export class TweetsRepository {
  static getProvider<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: 'TweetsEntityRepository',
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
