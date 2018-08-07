import { observable, action, computed } from 'mobx';

export class UserModel {
  @observable username = '';
  @observable token: string | null = null;

  constructor() {
    const token = sessionStorage.getItem('token');
    if (token === null || token === '') {
      return;
    }

    this.setToken(token);
  }

  @computed get isLogin() {
    return this.token !== null && this.token !== '';
  }

  @action
  setUsername(username: string) {
    this.username = username;
  }

  @action
  setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.token = token;
  }
}

export default new UserModel();
