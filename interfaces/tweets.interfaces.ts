export interface IFindTweetLessThanTenInLength {
  numberOfTweetsToBeFetched: number;
}

export interface ICreateTweet {
  tweets: string[];
}

export interface IDeleteTweet {
  tweetIds: string[];
}
