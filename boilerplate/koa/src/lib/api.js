import rq from './request';
import config from '../config';
const {
  FEEDS_HOST,
} = config;

export async function fetchFeeds(qs) {
  return rq({
    method: 'GET',
    uri: FEEDS_HOST,
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