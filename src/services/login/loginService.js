import { destroyCookie, setCookie } from 'nookies';

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

export const loginService = {
  async login({ username, password }) {
    return HttpClient('https://instalura-api-git-master-omariosouto.vercel.app/api/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((res) => {
      const { token } = res.data;
      const DAY_IN_SECONDS = 86400;
      setCookie(null, 'APP_TOKEN', token, {
        path: '/',
        maxAge: DAY_IN_SECONDS * 7, // 1 semana
      });
      return res;
    });
  },
  logout() {
    destroyCookie(null, 'APP_TOKEN');
  },
};
