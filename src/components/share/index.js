/* global wx:false */

import Alert from 'react-s-alert';

/*
 * window.orgInfo 由后端直接输出到页面中
 * {
 *    name: '',
 *    logo: '',
 *    module_setting: [[]]
 * }
 */


const WXS = (option = {}) => {
  if (!window.wx) {
    return;
  }
  const orgInfo = window.orgInfo || {
    name: '志多星',
    logo: '',
  };
  const host = `${location.protocol}//${location.hostname}`;
  const newOption = {
    title: `${option.title || orgInfo.name}`,
    desc: option.desc || '',
    // link: `${host}${option.link || ''}`,
    link: location.href.indexOf('?') > -1
          ? `${location.href}&orgcode=${window.orgCode}` : `${location.href}?orgcode=${window.orgCode}`,
    imgUrl: option.image || orgInfo.logo || `${host}/images/icon.png`,
    success: () => Alert.success('分享成功'),
  };

  console.log('微信分享设置:', newOption);

  [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
  ].forEach(share => wx[share](newOption));
};

export default WXS;
