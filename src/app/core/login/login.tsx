import React, { PureComponent, FormEventHandler } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

import { UserService } from '../user.service';

import styles from './login.module.scss';
import logoPath from './images/logo.png';

type Props = RouteComponentProps<any> & FormComponentProps;

interface State {
  isLoading: boolean;
}

// @ts-ignore
@Form.create()
export class LoginComponent extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  private setLoading() {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  }

  private handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      this.setLoading();
      UserService.login(values)
        .then(() => this.props.history.replace('/'))
        .catch(() => {
          this.setLoading();
          message.error('用户名或密码错误!');
        });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    // tslint:disable jsx-no-multiline-js
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logoPath} alt="logo"/>
        <h1 className={styles.title}>随时随地管理你的农场</h1>
        <Form className={styles.form} onSubmit={this.handleFormSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空!' }],
            })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }],
            })(<Input type="password" prefix={<Icon type="lock" />} placeholder="密码" />)}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} className={styles.button}>登录</Button>
        </Form>
      </div>
    );
  }
}
