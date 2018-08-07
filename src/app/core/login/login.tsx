import React, { Component, FormEventHandler } from 'react';
import { Input, Icon, Button } from 'antd';
import { observer } from 'mobx-react';

import { UserService } from '../user.service';
import LoginStore from './login.store';

import styles from './login.module.scss';
import logoPath from './images/logo.png';
import { RouteComponentProps } from 'react-router';

@observer
export class LoginComponent extends Component<RouteComponentProps<any>> {

  handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = LoginStore;
    LoginStore.setLoadingState(true);
    UserService.login(username, password).then(() => {
      this.props.history.replace('/');
    }).finally(() => {
      LoginStore.setLoadingState(false);
    });
  }

  render() {
    const { username, password, isLoading, updateUsername, updatePassword } = LoginStore;
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logoPath} alt="logo"/>
        <h1 className={styles.title}>随时随地管理你的农场</h1>
        <form className={styles.form} onSubmit={this.handleFormSubmit}>
          <Input
            prefix={<Icon type="user" />}
            placeholder="用户名"
            value={username}
            onChange={updateUsername}
          />
          <Input
            type="password"
            prefix={<Icon type="lock" />}
            placeholder="密码"
            value={password}
            onChange={updatePassword}
          />
          <Button type="primary" htmlType="submit" loading={isLoading} className={styles.button}>登录</Button>
        </form>
      </div>
    );
  }
}
