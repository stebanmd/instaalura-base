import { destroyCookie, setCookie } from 'nookies';
import { isStaging } from '../../infra/env/isStagingEnv';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
    ...options,
  }).then((serverResponse) => {
    if (serverResponse.ok) {
      return serverResponse.json();
    }
    throw new Error('Falha ao recuperar os dados do servidor');
  });
}

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
  : 'https://instalura-api-git-master-omariosouto.vercel.app/api/login';

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
      setCookieModule(null, 'APP_TOKEN', token, {
        path: '/',
        maxAge: DAY_IN_SECONDS * 7, // 1 semana
      });
      return { token };
    });
  },
  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};
