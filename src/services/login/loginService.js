import { destroyCookie, setCookie } from 'nookies';
import { isStaging } from '../../infra/env/isStagingEnv';
import { HttpClient } from '../../infra/http/HttpClient';

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
  : 'https://instalura-api-git-master-omariosouto.vercel.app/api/login';

export const LOGIN_COOKIE_APP_TOKEN = 'LOGIN_COOKIE_APP_TOKEN';

export const loginService = {
  async login({ username, password },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient) {
    return HttpClientModule(BASE_URL, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((res) => {
      const { token } = res.data;
      if (!token) {
        throw new Error('Failed to login');
      }
      const DAY_IN_SECONDS = 86400;
      setCookieModule(null, LOGIN_COOKIE_APP_TOKEN, token, {
        path: '/',
        maxAge: DAY_IN_SECONDS * 7, // 1 semana
      });
      return { token };
    });
  },
  async logout(ctx, destroyCookieModule = destroyCookie) {
    destroyCookieModule(ctx, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
  },
};
