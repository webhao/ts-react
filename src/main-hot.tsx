import React, { ComponentType } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './styles/styles.scss';

import { App } from './app/app';

const hotRender = (Component: ComponentType) => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

hotRender(App);

(module as any).hot.accept('./app/app', () => hotRender(App));
