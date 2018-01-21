/* global wx:false */
/* eslint no-param-reassign:off */
import Alert from 'react-s-alert';
import fetch from './fetch';

function uploadMany(localIds, success, fail, index = 0, serverUrls = []) {
  if (!localIds.length) {
    return;
  }

  if (index < localIds.length) {
    wx.uploadImage({
      localId: localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 9, // 默认为1，显示进度提示
      success: (res) => {
        fetch('/weixin/media', { method: 'GET', data: { media_id: res.serverId } })
        .then((json) => {
          if (json.error_code === 0) {
            serverUrls[index] = json.data.url;
            index += 1;
            upload(localIds, success, fail, index, serverUrls);
          }
        });
      },
      fail: (error) => {
        Alert.error(`上传失败：${error && error.errMsg}`);
        if (fail) {
          fail(error);
        }
      },
    });
  } else if (success) {
    success(serverUrls);
  }
}

function syncUpload() {

}

/**
 * 调用微信相关接口实现图片选择、上传到微信服务器、通知业务服务器获取最终文件 url
 * @param {function} success 参数为最终 url 数组
 * @param {function} fail
 * @param {int} count
 */
export default function uploadToWXMany(options) {
  const images = {
    localId: [],
    serverId: [],
  };
  wx.chooseImage({
    count: options.count || 9,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success(chooseRes) {
      const localIds = chooseRes.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      uploadMany(localIds, options.success, options.fail);
      images.localId = res.localIds;
      const len = images.localId.length;

      syncUpload(images.localId);
    },
    fail(error) {
      Alert.error(`图片选择失败：${error && error.errMsg}`);

      if (options.fail) {
        options.fail(error);
      }
    },
  });
}
