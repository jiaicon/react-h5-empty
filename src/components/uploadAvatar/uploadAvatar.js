import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { Toast } from "antd-mobile";
import uploadImage from "./../../utils/uploadImage";
import "antd-mobile/lib/toast/style/css";
import "./uploadAvatar.css";
import {
  getData,
  getAllTags,
  getTag,
  compress,
  rotateImage,
  base64ToBlob
} from "../../utils/exif";
import { compose } from "redux";

function loadingToast(options) {
  Toast.loading(
    options.loading || "Loading...",
    options.time || 0,
    callback => {
      console.log("Load complete !!!");
      options.callback &&
        typeof options.callback === "function" &&
        options.callback();
    }
  );
}

class UploadAvatar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      avatar: null
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  onPhotoChange(e) {
    var file = e.target.files[0];
    var that = this;
    console.info(file);
    getData(file, function() {
      getAllTags(this);
      console.log(this);

      var Orientation = getTag(this, "Orientation");
      console.info(Orientation);
      // 确认选择的文件是图片
      if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          var result = this.result;
          var img = new Image();
          img.src = result;
          console.info(img, Orientation);
          var data = result;
          img.onload = function() {
            data = rotateImage(img, Orientation);

            var img2 = new Image();
            img2.src = data;
            console.info(img2);
            var data2;
            img2.onload = function() {
              data2 = compress(img2, Orientation);

              let conversions = base64ToBlob(data2, "image/png");
              uploadImage(`/api/imgupload`, {
                method: "POST",
                data: { file: { file: conversions } }
              }).then(json => {
                if (json.error_code === 0) {
                  that.props.onChange(json.data.url);
                  that.setState({
                    avatar: json.data.url
                  });
                }
              });
              //这里是最后的Image的生成 data2 为最终目标文件
            };
          };
        };
      }
    });
  }
  render() {
    return (
      <div className="uploadAvatar" style={{ ...this.props.style }}>
        <div className="page-profile-header-uploade-box-div">
          <div className="page-profile-header-uploade-box-iptbox">
            <input
              onChange={this.onPhotoChange}
              accept="image/png, image/jpeg, image/jpg"
              ref={c => {
                this.image = c;
              }}
              className="page-profile-header-uploade-box-ipt"
              type="file"
            />
          </div>
          <div
            className="page-profile-header-uploade-box-img"
            style={{
              backgroundImage: `url(${
                this.state.avatar
                  ? this.state.avatar
                  : this.props.avatar
                  ? this.props.avatar
                  : "/images/my/register.png"
              })`
            }}
          />
        </div>
      </div>
    );
  }
}

UploadAvatar.propTypes = {};

export default UploadAvatar;
