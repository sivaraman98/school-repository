import { Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../environments/environment';
import { IResponseObject, framedResponse } from '../utils/response-framer';

export class TweetsApi {
  logger: Logger;
  tweetsURL = environment.tweetsUrl;

  constructor() {
    this.logger = new Logger('TWEETS_API');
  }

  private log(message: string) {
    this.logger.log(`${message}`);
  }

  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  async createTweetFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`Tweets creation initiated for: ${JSON.stringify(data)}`);

      return await axios
        .post(`${this.tweetsURL}/createTweet`, data)
        .then((response) => {
          if (!response) throw `Errored while tweet creation.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async fetchTweetFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`Fetch tweet initiated for: ${JSON.stringify(data)}`);

      return await axios
        .get(`${this.tweetsURL}/fetchTweet/${data.tweetId}`)
        .then((response) => {
          if (!response)
            throw `Errored while fetching a tweet with id: ${data.tweetId}.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async deleteTweetFunction<T>(data): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`Delete tweets initiated for: ${JSON.stringify(data)}`);

      return await axios
        .post(`${this.tweetsURL}/deleteTweet`, data)
        .then((response) => {
          if (!response) throw `Errored while deleting tweets.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async fetchTweetsLessThanTenInLengthFunction<T>(): Promise<
    IResponseObject<T>
  > {
    try {
      this.logger.log(`Fetching tweets less than ten in length initiated.`);

      return await axios
        .get(`${this.tweetsURL}/findTweetsLessThanTenInLength`)
        .then((response) => {
          if (!response)
            throw `Errored while fetching tweets less than ten in length.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }

  async fetchAllTweetsFunction<T>(): Promise<IResponseObject<T>> {
    try {
      this.logger.log(`Fetch all tweets function successfully initiated.`);

      return await axios
        .get(`${this.tweetsURL}/fetchAllTweets`)
        .then((response) => {
          if (!response) throw `Errored while fetching all tweets.`;
          if (response.data.status === 'ERROR')
            throw `${response.data.message}`;
          return response.data;
        });
    } catch (error) {
      this.logger.error(error);
      return framedResponse('ERROR', `${error}`);
    }
  }
}
