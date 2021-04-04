import { loginService } from './loginService';

const setCookieModule = jest.fn();
const token = 'fake_token';

async function HttpClientModule() {
  return {
    data: {
      token,
    },
  };
}

async function HttpClientModuleError() {
  return {
    data: {},
  };
}

describe('loginService', () => {
  describe('login()', () => {
    describe('when user try to login', () => {
      describe('and succeed', () => {
        test('store its token', async () => {
          const loginResponse = await loginService.login({
            username: 'someusername',
            password: 'somepassword',
          }, setCookieModule, HttpClientModule);

          expect(setCookieModule).toHaveBeenCalledWith(null, 'APP_TOKEN', token, {
            path: '/',
            maxAge: 604800,
          });

          expect(loginResponse).toEqual({ token });
        });
      });

      describe('and it fails', () => {
        test('throws and error', async () => {
          await expect(loginService.login({
            username: 'someusername',
            password: 'somepassword',
          }, setCookieModule, HttpClientModuleError))
            .rejects
            .toThrow('Failed to login');
        });
      });
    });
  });

  describe('logout()', () => {
    describe('when user try to logout and succeed', () => {
      test('remove its token', async () => {
        const destroyCookie = jest.fn();
        await loginService.logout(destroyCookie);

        expect(destroyCookie).toHaveBeenCalledWith(null, 'APP_TOKEN');
      });
    });
  });
});
