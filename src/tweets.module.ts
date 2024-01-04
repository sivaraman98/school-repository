import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TweetsEntity } from '../entities/tweets.entity';
import { environment } from '../environments/environment';

@Module({
  imports: [],
  controllers: [TweetsController],
  providers: [
    TweetsService,
    TweetsEntity,
    ...environment.entityProviders,
    ...environment.dataSources,
  ],
})
export class AppModule {}
