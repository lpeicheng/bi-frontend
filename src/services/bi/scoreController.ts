// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** checkIn POST /api/score/checkIn */
export async function checkInUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/score/checkIn', {
    method: 'POST',
    ...(options || {}),
  });
}

/** getUserById GET /api/score/get */
export async function getUserByIdUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/score/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getSignById GET /api/score/getSign */
export async function getSignByIdUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/score/getSign', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getTokens GET /api/score/getTokens */
export async function getTokensUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/score/getTokens', {
    method: 'GET',
    ...(options || {}),
  });
}
