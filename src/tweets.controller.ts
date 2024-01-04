import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Logger } from '@nestjs/common';
import { validateTweetInfo } from '../validators/tweets.validator';
import { ICreateTweet, IDeleteTweet } from '../interfaces/tweets.interfaces';
import { framedResponse } from 'utils/response-framer';

@Controller()
export class TweetsController {
  logger: Logger;
  constructor(private readonly tweetsService: TweetsService) {
    this.logger = new Logger('TWEETS_CONTROLLER');
  }
  private log(message: string) {
    this.logger.log(`${message}`);
  }
  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  @Get('/findTweetsLessThanTenInLength')
  async findTweetsLessThanTenInLength(@Body() body: null) {
    try {
      this.logger.log(
        `Request received for fetching the tweets which are less than 10 in length.`,
      );

      return await this.tweetsService.findTweetsLessThanTenInLength();
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('/createTweet')
  async createTweet(@Body() body: ICreateTweet) {
    try {
      this.logger.log(
        `Request received for creating tweets with data: ${JSON.stringify(
          body,
        )}`,
      );

      const validatedTweetInfo = validateTweetInfo(body);

      return await this.tweetsService.createTweet(validatedTweetInfo);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Post('/deleteTweet')
  async deleteTweet(@Body() body: IDeleteTweet) {
    try {
      this.logger.log(
        `Request received for deleting a tweet with data: ${body}`,
      );

      return await this.tweetsService.deleteTweet(body.tweetIds);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Get('/fetchTweet/:id')
  async fetchTweet(@Param('id') tweetId: string) {
    try {
      this.logger.log(
        `Request received for fetching a tweet with id: ${tweetId}`,
      );

      return await this.tweetsService.fetchTweet(tweetId);
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }

  @Get('/fetchAllTweets')
  async fetchAllTweets(@Body() body: null) {
    try {
      this.logger.log(`Request received for fetching all the tweets.`);

      return await this.tweetsService.fetchAllTweets();
    } catch (error) {
      return framedResponse('ERROR', error.message);
    }
  }
}
