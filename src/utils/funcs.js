/* global wx:false, qq:false */

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

// 遍历转baser64
export function ImageToBase64(imageArrays, defaultArrays, callback, index) {
  if (!imageArrays.length) return;
  if (index < imageArrays.length) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "*";
    img.onload = function() {
      var w = img.width;
      var h = img.height;
      canvas.height = 200;
      canvas.width = 200;

      if (w > h) {
        let diff = (w - h) / 2;

        ctx.drawImage(img, diff, 0, h, h, 0, 0, 200, 200);
      } else if (w < h) {
        let diff = (h - w) / 2;

        ctx.drawImage(img, 0, diff, w, w, 0, 0, 200, 200);
      } else if (w == h) {
        ctx.drawImage(img, 0, 0, w, w, 0, 0, 200, 200);
      }
      var dataURL = canvas.toDataURL("image/png");
      imageArrays[index] = dataURL;
      index++;
      ImageToBase64(imageArrays, defaultArrays, callback, index);
      canvas = null;
    };
    img.onerror = function(e) {
      if (defaultArrays[index]) {
        img.src = defaultArrays[index];
      } else {
        this.style.visibility = "hidden";
      }
    };
    img.src = imageArrays[index];
  } else {
    callback && callback(imageArrays);
  }
}

// 去除三里屯  志愿回馈
export function deleteSanlitunMoudling(data) {
  let newData = data.map(item => {
    return item.filter(ite => {
      return ite["key"] != "volunteer_feedback";
    });
  });
  return newData;
}
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return "";
}
export function parseTimeStringToDateString(timeString) {
  const dateString = timeString.split(" ")[0];
  return dateString.replace(/-/g, ".");
}

export function isWindowReachBottom(threshold = 0) {
  if (
    window.innerHeight + window.scrollY + threshold >=
    document.body.scrollHeight
  ) {
    return true;
  }
  return false;
}

export function parseDistance(distance) {
  let parsedDistance = distance / 1000;

  if (parsedDistance < 10) {
    parsedDistance = parsedDistance.toFixed(1);
  } else {
    parsedDistance = parseInt(parsedDistance, 10);
  }

  return `${parsedDistance}km`;
}

export function getLocation(success, fail, noCache) {
  if (window.dev) {
    setCookie(
      "location",
      JSON.stringify({ lat: "40.065560", lng: "116.314820" }),
      1
    );
    success({
      lng: "116.314820",
      lat: "40.065560"
    });
    return;
  }

  // let cachedLoc = localStorage.getItem('location');
  // cachedLoc = cachedLoc ? JSON.parse(cachedLoc) : cachedLoc;

  // if ((cachedLoc && cachedLoc.expires <= Date.now()) || noCache === true) {
  //   cachedLoc = null;
  // }
  let cachedLoc = null;
  if (!cachedLoc) {
    let geolocation = new qq.maps.Geolocation(
      "GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI",
      "myapp"
    );
    let options = { timeout: 8000 };
    geolocation.getLocation(function(position) {
      const lat = position.lat; // 纬度，浮点数，范围为90 ~ -90
      const lng = position.lng; // 经度，浮点数，范围为180 ~ -180
      const expires = Date.now() + 5 * 60 * 1000; // 5分钟过期
      console.log("获取新位置成功", position);
      setCookie("location", JSON.stringify({ lat, lng }), 1);

      if (success) {
        success({ lat, lng });
      }
    }, options);
  } else if (success) {
    success({
      lat: cachedLoc.lat,
      lng: cachedLoc.lng
    });
  }
}

export function getCity(success, fail) {
  if (window.dev) {
    const city = "北京市";
    const province = "北京";
    setCookie("provinceAndCityName", JSON.stringify({ city, province }), 1);
    success(city || "北京");
    return;
  }

  getLocation(
    loc => {
      const geocoder = new qq.maps.Geocoder({
        complete: result => {
          console.log(result);
          if (
            result.detail.addressComponents &&
            result.detail.addressComponents.city
          ) {
            if (!success) {
              console.log(result);
              return;
            }
            const city = result.detail.addressComponents.city;
            const province = result.detail.addressComponents.province;
            success(
              result.detail.addressComponents.city.replace("市", ""),
              JSON.stringify({
                city,
                province
              })
            );
          } else if (fail) {
            fail({});
          }
        },
        error: function(res) {
          console.log("res", res);
        }
      });
      console.log("coord::::");
      const coord = new qq.maps.LatLng(loc.lat, loc.lng);
      console.log("coord::", coord);
      geocoder.getAddress(coord);
    },
    error => {
      if (fail) {
        fail(error);
      }
    }
  );
}

export function getToken() {
  if (window.dev) {
    return localStorage.getItem("token");
  }

  return window.token;
}

export function setToken(token) {
  if (window.dev) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  } else {
    window.token = token;
  }
}

/**
 * 时间戳转日期
 * @param {int} timestamp 时间戳
 * @return {string} 例如 2017年7月27日
 */
export function timestampToDateText(timestamp) {
  let ts = timestamp;

  if (`${ts}`.length === 10) {
    ts *= 1000;
  }

  const date = new Date(ts);

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 2017-10-18 转 2017年10月18日
 * @param {string} dateText
 */
export function dateTextToDateText(dateText) {
  const re = /^(\d+)-(\d+)-(\d+)$/;
  const match = dateText.match(re);

  if (match) {
    return `${match[1]}年${match[2]}月${match[3]}日`;
  }

  return "";
}

export function isVolunteerInsure(str) {
  if (str.indexOf("志愿者保险") !== -1) {
    return true;
  }
  return false;
}
export function DX(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p+1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}