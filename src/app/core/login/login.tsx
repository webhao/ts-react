import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';

import styles from './login.module.scss';
import logoPath from './images/logo.png';

export class LoginComponent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logoPath} alt="logo"/>
        <h1 className={styles.title}>随时随地管理你的农场</h1>
        <form className={styles.form}>
          <Input prefix={<Icon type="user" />} placeholder="用户名" />
          <Input prefix={<Icon type="lock" />} placeholder="密码" />
          <Button type="primary" className={styles.button} >登录</Button>
        </form>
      </div>
    );
  }
}
