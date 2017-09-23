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
import history from './pages/history';

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

// Handle client-side navigation by using HTML5 History API For more information
// visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
history.listen(render);
render(history.location);

// Eliminates the 300ms delay between a physical tap and the firing of a click
// event on mobile browsers https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module
    .hot
    .accept('./routes.json', () => {
      routes = require('./routes.json').default; // eslint-disable-line global-require
      render(history.location);
    });
}
