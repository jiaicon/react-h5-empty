/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';


// 微信 Android 下需要使用 hash 实现前端路由，否则会影响 JSSDK 授权
// 如果 query 中有 preview=1 则为后台预览链接，不考虑平台兼容性（否则
export const USING_HISTORY_HASH =
  /Android/i.test(navigator.userAgent)
  // && /MicroMessenger/i.test(navigator.userAgent)
  && !/preview=1/.test(location.href);

export default USING_HISTORY_HASH ? createHashHistory() : createHistory();
