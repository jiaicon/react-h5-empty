/* global wx:false, qq:false */
import EventEmitter from 'eventemitter3';

export const EM = new EventEmitter();

export function parseTimeStringToDateString(timeString) {
  const dateString = timeString.split(' ')[0];
  return dateString.replace(/-/g, '.');
}

export function isWindowReachBottom(threshold = 0) {
  if ((window.innerHeight + window.scrollY + threshold) >= document.body.scrollHeight) {
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
  let cachedLoc = localStorage.getItem('location');
  cachedLoc = cachedLoc ? JSON.parse(cachedLoc) : cachedLoc;

  if ((cachedLoc && cachedLoc.expires <= Date.now()) || noCache === true) {
    cachedLoc = null;
  }

  if (!cachedLoc) {
    window.wx.ready(() => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180
          const expires = Date.now() + (5 * 60 * 1000); // 5分钟过期

          console.log('获取新位置成功', res);

          localStorage.setItem('location', JSON.stringify({
            lat,
            lng,
            expires,
          }));

          if (success) {
            success({
              lat,
              lng,
            });
          }

          EM.emit('location');
        },
        fail: (error) => {
          if (fail) {
            fail(error);
          }
        },
      });
    });
  } else if (success) {
    success({
      lat: cachedLoc.lat,
      lng: cachedLoc.lng,
    });
  }
}

export function getCity(success, fail) {
  getLocation((loc) => {
    const geocoder = new qq.maps.Geocoder({
      complete(result) {
        if (success) {
          success(result.detail.addressComponents.city);
        }
      },
    });
    const coord = new qq.maps.LatLng(loc.lat, loc.lng);
    geocoder.getAddress(coord);
  }, (error) => {
    if (fail) {
      fail(error);
    }
  });
}
