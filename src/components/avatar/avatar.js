import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './avatar.css';


class Avatar extends React.Component {

  static propTypes = {
    // 确定人物头像，还是logo头像  show人物头像圆形    ！show LOGO方形状   bg控制人物背景图  !bg LOGO   bug:1.src传入坏死链接，无背景图  2.不能直接给组件改变大小，得套容器
    show: PropTypes.bool,
    src: PropTypes.string,
    bg: PropTypes.bool,

  }

  constructor(props) {
    super(props);
    autoBind(this);
    // avatarSrc人物头像，logoSrc  logo头像
    this.logoSrc = '/images/default_avatar.png';
    this.avatarSrc = '/images/my/register.png';

    this.state = {
      src: this.configSrc(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      src: this.configSrc(nextProps),
    });
  }
  // 动态确定SRC为长方形，正方形
  getUrlWidthAndHeight(url) {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      if (img.width === img.height) {
        this.setState({
          ratio: 1,
        });
      }
      this.setState({
        ratio: 0,
      });
    }
    img.onload = function imgload() {
      if (img.width === img.height) {
        this.setState({
          ratio: 1,
        });
      }
      this.setState({
        ratio: 0,
      });
    };
    this.imgload();
  }

  configSrc(props) {
    const show = this.props.show;
    let src = this.props.src;
    if (show) {
      src = props.src || this.avatarSrc;
    } else {
      src = props.src || this.logoSrc;
    }

    return src;
  }

  render() {
    const src = this.state.src;
    const ratio = this.state.ratio;
    const show = this.props.show;
    const bg = this.props.bg;

    return (<div
      className={classnames({
        'avatar-bg1': bg,
        'avatar-bg2': !bg,
        'avatar-box': !ratio,
        'avatar-center': ratio,
        'avatar-square': !show,
        'avatar-round': show,
      })}
      style={{ backgroundImage: `url(${src})` }}
    />);
  }

}

export default Avatar;
