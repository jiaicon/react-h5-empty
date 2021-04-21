/* global wx:false, qq:false */
import i18next from 'i18next';

//写cookies（设置作用域）
export function setCookie(name, value, Days) {
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  let hostname = location.hostname.substring(
    location.hostname.indexOf(".") + 1
  ); //设置为一级域名
  document.cookie =
    name +
    "=" +
    escape(value) +
    ";expires=" +
    exp.toGMTString() +
    ";domain=" +
    hostname +
    ";path=/";
}
//读取cookies
export function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}
//删除cookies（有作用域的）
export function delCookie(name) {
  var exp = new Date();
  var name = "access_token";
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    let hostname = location.hostname.substring(
      location.hostname.indexOf(".") + 1
    );
    document.cookie =
      name +
      "='';expires=" +
      exp.toGMTString() +
      ";domain=" +
      hostname +
      ";path=/";
  }
}
