import { observable, action } from 'mobx';
import { ChangeEvent } from 'react';

class LoginStore {
  @observable username = '';
  @observable password = '';
  @observable isLoading = false;

  @action.bound
  updateUsername(e: ChangeEvent<HTMLInputElement>) {
    this.username = e.currentTarget.value;
  }

  @action.bound
  updatePassword(e: ChangeEvent<HTMLInputElement>) {
    this.password = e.currentTarget.value;
  }

  @action
  setLoadingState(state: boolean) {
    this.isLoading = state;
  }
}

export default new LoginStore();
