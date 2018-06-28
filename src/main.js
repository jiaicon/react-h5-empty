/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 /* global wx:false */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import Alert from 'react-s-alert';
import { Provider } from 'react-redux';

import { Spinner } from 'react-redux-spinner';


import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './components/layout/global.css';

import router from './pages/router';
import history, { USING_HISTORY_HASH } from './pages/history';

import store from './stores';
import WXShare from './components/share';


if (wx) {
  wx.ready(() => WXShare());
}

let routes = require('./routes.json').default; // Loaded with utils/routes-loader.js

const container = document.getElementById('container');

function renderComponent(component) {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        {component}
        <Alert
          stack={{
            limit: 3,
          }}
          effect="stackslide"
          position="top"
          offset={0}
          timeout={2000}
        />
        <Spinner />
      </div>
    </Provider>, container);
}

// Find and render a web page matching the current URL path, if such page is not
// found then render an error page (see routes.json, core/router.js)
function render(location) {
  router
    .resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, {
      ...location,
      error,
    }).then(renderComponent));
}


/**
 * 如果需要使用 hash 的 history 方案，但是 URL 是 path 方案则需要跳转到 hash 方案
 */

if (USING_HISTORY_HASH && location.pathname !== '/') {
  location.href = `${location.protocol}//${location.host}/#${location.pathname}`;
} else if (!USING_HISTORY_HASH
  && location.pathname === '/'
  && location.hash.length > 2
  && location.hash.indexOf('#/') === 0) {
  location.href = `${location.protocol}//${location.host}/${location.hash.replace(/^#\//g, '')}`;
} else {
// Handle client-side navigation by using HTML5 History API For more information
// visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
  // 微信 config 验证完成后再初始化界面
  // 否则当首页验证未完成时用户切换到其他页面如打卡页，如果也注册了 ready 事件则在慢网速下容易出现验证失败的问题
  // 测试发现，如果在首页验证完成后再跳转或者打开的直接是打卡页均不会出现类似问题
  // 因此做此修改
  if (!window.dev) {
    wx.ready(() => {
      history.listen(render);
      render(history.location);
    });
  } else {
    history.listen(render);
    render(history.location);
  }

// Eliminates the 300ms delay between a physical tap and the firing of a click
// event on mobile browsers https://github.com/ftlabs/fastclick
  window.fastclick = FastClick.attach(document.body);
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module
    .hot
    .accept('./routes.json', () => {
      routes = require('./routes.json').default; // eslint-disable-line global-require
      render(history.location);
    });
}
