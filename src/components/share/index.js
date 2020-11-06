/* global wx:false */

import Alert from "react-s-alert";
import { USING_HISTORY_HASH } from "../../pages/history";
import i18next from 'i18next';

/*
 * window.orgInfo 由后端直接输出到页面中
 * {
 *    name: '',
 *    logo: '',
 *    module_setting: [[]]
 * }
 */
function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
  str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
  return str;
}

const WXS = (option = {}) => {
  if (!window.wx) {
    return;
  }
  const orgInfo = window.orgInfo || {
    name: i18next.t("志多星"),
    logo: ""
  };
  const host = `${location.protocol}//${location.hostname}`;
  let shareUrl = location.href;

  // 使用 HASH 的环境下分享出去的链接转换成 path 形式，否则有可能有兼容性问题（分享不出去 hash）
  if (
    USING_HISTORY_HASH &&
    location.pathname === "/" &&
    location.hash.length > 2 &&
    location.hash.indexOf("#/") === 0
  ) {
    shareUrl = `${location.protocol}//${location.host}/${location.hash.replace(
      /^#\//g,
      ""
    )}`;
  }
  const orgCode = orgInfo.orgCode;
  let desxName = (orgInfo&&orgInfo.org_info) || i18next.t("文明点亮你我，志愿感动社会");
  if (orgCode == "qM7e5Ba2vp") {
    desxName = "志愿小金人，用爱传温暖！";
  }
  if (orgCode == "7N1aM8AeWm") {
    desxName = "让我们携手共建更美好的世界！";
  }
  const newOption = {
    title: `${option.title || orgInfo.name}`,
    desc: removeHTMLTag(option.desc || desxName),
    link: shareUrl,
    imgUrl:
      option.image ||
      orgInfo.logo ||
      `${
        host // link: `${host}${option.link || ''}`,
      }/images/icon.png`,
    success: () => {
      Alert.success("分享成功");
      if (option.success) {
        option.success();
      }
    }
  };

  console.log("微信分享设置:", newOption);

  [
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone"
  ].forEach(share => wx[share](newOption));
};

export default WXS;
