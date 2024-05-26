// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** sendForgetCaptcha POST /api/captcha/forget */
export async function sendForgetCaptchaUsingPost(
  body: API.UserCaptchaRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/captcha/forget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendRegisterCaptcha POST /api/captcha/register */
export async function sendRegisterCaptchaUsingPost(
  body: API.UserCaptchaRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/captcha/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
