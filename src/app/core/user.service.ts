import { HttpClient } from './http-client';
import UserStore from './user.store';

interface ResponseData {
  code: number;
  userId: number;
  username: string;
  telephone: string;
  token: string;
  roles: any[];
  department: any;
  enterprise: any;
  featureTree: any;
}

export class UserService {
  static async login(data: {username: string; password: string}) {
    return HttpClient.post<ResponseData>('/author/login', data)
      .then(({ token }) => {
        UserStore.setToken(token);
      });
  }
}
