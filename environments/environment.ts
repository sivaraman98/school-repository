import { entitiesToInject } from '../entities/tweets.entity';
import { TweetsRepository } from '../typeorm-helpers/typeorm-helper';
import { DataSourceOptions } from 'typeorm';

export const postgresLocalConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'tweets',
  entities: entitiesToInject,
  synchronize: true,
};

export const environment = {
  dataSources: TweetsRepository.generateDataSources([postgresLocalConfig]),
  entityProviders: entitiesToInject.map((v) => TweetsRepository.getProvider(v)),
  tweetsUrl: 'http://localhost:3000',
};
