import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

export const userService = {
  async getProfilePage(ctx) {
    try {
      const userToken = await authService(ctx).getToken();
      const response = await HttpClient(`${process.env.BASE_URL}/api/users/posts/`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      return {
        user: {
          totalLikes: 100,
        },
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não foi possível carregar os posts');
    }
  },
};
