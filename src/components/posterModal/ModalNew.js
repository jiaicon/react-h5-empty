/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import classnames from "classnames";
import "./ModalNew.css";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { ImageToBase64 } from "../../utils/funcs";
class ModalNew extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    visible: PropTypes.bool,
    projectData: PropTypes.shape({}),
    userinfoData: PropTypes.shape({}),
    type: PropTypes.number,
    maskCloseable: PropTypes.func,
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      qrcode: null,
    };
  }

  componentWillMount() {
    this.createQrcode();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const that = this;
    if (nextProps.projectData && nextProps.userinfoData && nextProps.userinfoData.id) {
      let projectPhoto = (nextProps.projectData && nextProps.projectData.photo && nextProps.projectData.photo[0]) ||'/images/default_banner.png';
      let userphoto = (nextProps.userinfoData && nextProps.userinfoData.avatars) ||'/images/my/register.png';
      ImageToBase64([projectPhoto, userphoto], ["/images/default_banner.png", "/images/my/register.png"], base64Array => {
        that.setState({
          base64Array: base64Array.slice(0), 
        }, () => {
          that.htm2Click();
        });

      }, 0);
    }

    
  
}
  
htm2Click = () => {
  var that = this;
  var shareContent = this.refs["LaunchContent"];
  var width = shareContent.offsetWidth;
  var height = shareContent.offsetHeight;
  var canvas = document.createElement("canvas");
  var scale = 4;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.getContext("2d").scale(scale, scale);
  var opts = {
    scale: scale,
    canvas: canvas,
    width: width,
    height: height,
    useCORS: true
  };
  html2canvas(shareContent, opts).then(function (canvas) {
    var dataUrl = canvas.toDataURL("image/jpeg", 4);
    that.setState({ dataUrl });
  });
};


  componentWillUnmount() {}

  _closeModal() {
    this.props.maskCloseable()
  }
  _clearEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  createQrcode=(callback)=>{
    const that = this;
    let canvas = document.createElement("canvas");

    QRCode.toCanvas(
      canvas,
      `${this.props.url}`,
      function(err) {
        if (!err) {
          // 证明生成了二维码（canvas） 然后把二维码转为图片
          let qrcode = canvas.toDataURL("image/png");
          that.setState({ qrcode });
          callback && callback(base64);
        }
      }
    );
  }
 
  render() {
    return <div className={classnames({
          visible: this.props.visible,
          hidden: !this.props.visible,
          "poster-modal-new": true
        })}>
        <div className="poster-modal-new-mask" />
        <div className="poster-modal-new-wrap" onClick={this._closeModal}>
          <div className="poster-modal-new-wrap-container" onClick={this._clearEvent}>
            {this.state.dataUrl ? <img src={this.state.dataUrl} className="poster-modal-new-wrap-container-padding" /> : <div className="poster-modal-new-wrap-container-padding" ref="LaunchContent">
                <div>
                  <div className="content">
                    <img className="project-img" src={this.state.base64Array && this.state.base64Array[0]} />
                    <div style={{ display: "flex", padding: "0 15px", height: "83px" }}>
                      <img className="user-avatars" src={this.state.base64Array && this.state.base64Array[1]} />
                      <div style={{ width: "100%" }}>
                        <div className="user-name">111</div>
                        <div className="poster-main">
                          <div className="poster-fonts">
                            长按识别二维码 一起来做志愿者长按识别二维码,
                            长按识别二维码 一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者, 长按识别二维码
                            一起来做志愿者长按识别二维码, 长按识别二维码
                            一起来做志愿者,
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "288px", display: "flex" }}>
                    <img style={{ width: "48px", height: "48px" }} src={this.state.qrcode} />
                    <div style={{ width: "85px", fontSize: "12px", transform: "scale(0.8)", paddingTop: "19px", color: "#fff" }}>
                      长按识别二维码 一起来做志愿者
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>;
  }
}

export default ModalNew;
