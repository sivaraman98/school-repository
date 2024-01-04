import { TweetsApi } from './tweets-api';
const tweetsApis = new TweetsApi();

describe(`Tweets test cases`, () => {
  jest.setTimeout(5000000);

  it(`Test the createTweet function`, async () => {
    const response = await tweetsApis.createTweetFunction({
      tweets: ['Welcome !'],
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});

describe(`Test the fetchTweet function`, () => {
  jest.setTimeout(5000000);

  it(`Test function`, async () => {
    const response = await tweetsApis.fetchTweetFunction({
      tweetId: '35d60716-588e-4bfd-8ff9-6269089f5a81',
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});

describe(`Test the fetchAllTweets function`, () => {
  jest.setTimeout(5000000);

  it(`Test function`, async () => {
    const response = await tweetsApis.fetchAllTweetsFunction();
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});

describe(`Test the fetchTweetsLessThanTenInLength function`, () => {
  jest.setTimeout(5000000);

  it(`Test function`, async () => {
    const response = await tweetsApis.fetchTweetsLessThanTenInLengthFunction();
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});

describe(`Test the deleteTweet function`, () => {
  jest.setTimeout(5000000);

  it(`Test function`, async () => {
    const response = await tweetsApis.deleteTweetFunction({
      tweetIds: ['7f4366a5-d9e3-48c8-a7b7-da957f060781'],
    });
    expect(response.status).toStrictEqual('SUCCESS');
    return response;
  });
});
