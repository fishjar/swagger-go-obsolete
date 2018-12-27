import rq from './request';

export async function fetchFeeds(qs) {
  return rq({
    method: 'GET',
    uri: 'https://api.github.com/feeds',
    // headers: {
    //   'User-Agent': 'Request-Promise',
    // },
    // qs: {
    //   foo: 'bar',
    // },
    // body: {
    //   some: 'payload',
    // },
    qs,
  });
}