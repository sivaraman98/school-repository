import { ICreateTweet } from '../interfaces/tweets.interfaces';

export function validateTweetInfo(data: ICreateTweet) {
  try {
    const tweets = data.tweets;
    let validatedTweets = [];
    for (const tweet of tweets) {
      if (typeof tweet != 'string') {
        throw `Type of tweet that you have provided is not valid. Please provide the tweets with the type of string.`;
      } else {
        validatedTweets.push(tweet);
      }
    }
    return validatedTweets;
  } catch (error) {
    throw `${error}`;
  }
}
