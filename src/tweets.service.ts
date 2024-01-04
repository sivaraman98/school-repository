import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TweetsEntity } from '../entities/tweets.entity';
import { v4 as uuidv4 } from 'uuid';
import { framedResponse } from '../utils/response-framer';

@Injectable()
export class TweetsService {
  private logger: Logger;
  constructor(
    @InjectRepository(TweetsEntity) private TFRepo: Repository<TweetsEntity>,
  ) {
    this.logger = new Logger('TWEETS_SERVICE');
  }
  private log(message: string) {
    this.logger.log(`${message}`);
  }

  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  async findTweetsLessThanTenInLength() {
    try {
      this.logger.log(
        `Request received for finding the tweet which is less than ten in length.`,
      );

      const shortestTweets = await this.TFRepo.query(`
           SELECT 
              id AS id,
              tweets AS tweets
           FROM tweets
           WHERE LENGTH(tweets) < 10
      `);
      this.logger.log(
        `Shortest tweets successfully fetched with data: ${JSON.stringify(
          shortestTweets,
        )}`,
      );

      return framedResponse(
        'SUCCESS',
        `Shortest tweets successfully fetched.`,
        shortestTweets,
      );
    } catch (error) {
      return framedResponse(
        'ERROR',
        `Errored while fetching the tweets which is less than ten in length with message: ${error.message}`,
      );
    }
  }

  async createTweet(tweets: string[]) {
    try {
      this.logger.log(
        `Request received for creating tweets with data: ${tweets}`,
      );

      let savedTweets = [];
      for (let tweet of tweets) {
        //Checking the presence of tweet.
        const isTweetPresentAlready = await this.TFRepo.findOne({
          where: { tweets: tweet },
        });
        if (isTweetPresentAlready)
          throw new Error(
            `The tweet that you are trying to create is present already.`,
          );

        //Creating the tweet.
        const generatedTweetId = uuidv4();
        const saveTweet = await this.TFRepo.create({
          id: generatedTweetId,
          tweets: tweet,
        });
        saveTweet.save();
        savedTweets.push({ id: generatedTweetId, tweet });
      }
      this.logger.log(
        `Tweet successfully created with data: ${JSON.stringify(savedTweets)}`,
      );

      return framedResponse(
        'SUCCESS',
        `Tweets successfully created`,
        savedTweets,
      );
    } catch (error) {
      this.logger.error(
        `Errored while creating tweets with message: ${error.message}`,
      );
      return framedResponse(
        'ERROR',
        `Errored while creating tweets with message: ${error.message}`,
      );
    }
  }

  async deleteTweet(tweetIds: string[]) {
    try {
      this.logger.log(
        `Request received for deleting tweets with ids: ${tweetIds}`,
      );

      let deletedTweets = [];
      for (let tweetId of tweetIds) {
        //Checking the presence of tweets.
        const isTweetPresent = await this.TFRepo.findOne({
          where: { id: tweetId },
        });
        if (!isTweetPresent)
          throw new Error(
            `The tweetId ${tweetId} that you have provided is not present. Please provide a valid tweetId.`,
          );

        //Deleting the tweets.
        const deletedTweet = await this.TFRepo.delete({ id: tweetId });
        deletedTweets.push(tweetId);
      }
      this.logger.log(
        `Tweets successfully deleted with tweetIds: ${tweetIds}.`,
      );

      return framedResponse('SUCCESS', `Tweets successfully deleted.`);
    } catch (error) {
      this.logger.error(
        `Errored while deleting a tweet with message: ${error.message}`,
      );
      return framedResponse(
        'ERROR',
        `Errored while deleting a tweet with message: ${error.message}`,
      );
    }
  }

  async fetchTweet(tweetId: string) {
    try {
      this.logger.log(
        `Request received for fetching a tweet with id: ${tweetId}`,
      );

      const fetchedTweet = await this.TFRepo.findOne({
        where: { id: tweetId },
      });
      if (!fetchedTweet)
        throw new Error(
          `The tweetId that you have provided is invalid. Please provide a valid one.`,
        );
      this.logger.log(`Tweet successfully fetched with data: ${fetchedTweet}`);

      return framedResponse(
        'SUCCESS',
        `Tweet successfully fetched`,
        fetchedTweet,
      );
    } catch (error) {
      this.logger.error(
        `Errored while fetching a tweet with message: ${error.message}`,
      );
      throw framedResponse(
        'ERROR',
        `Errored while fetching a tweet with message: ${error.message}`,
      );
    }
  }

  async fetchAllTweets() {
    try {
      this.logger.log(`Request received for fetching all tweets.`);

      const fetchedTweets = await this.TFRepo.find();
      if (!fetchedTweets.length)
        throw new Error(`No tweets found. Please create a new one.`);
      this.logger.log(
        `All tweets successfully fetched with data: ${JSON.stringify(
          fetchedTweets,
        )}`,
      );

      return framedResponse(
        'SUCCESS',
        `Tweets successfully fetched.`,
        fetchedTweets,
      );
    } catch (error) {
      this.logger.error(
        `Errored while fetching all tweets with message: ${error.message}`,
      );
    }
  }
}
