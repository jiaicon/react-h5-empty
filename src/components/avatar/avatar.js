import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './avatar.css';


class Avatar extends React.Component {

  static propTypes = {
    // 确定人物头像，还是logo头像
    isAvatar: PropTypes.bool,
    src: PropTypes.string,

  }

  constructor(props) {
    super(props);
    autoBind(this);
    // avatarSrc人物头像，logoSrc  logo头像
    this.logoSrc = '/images/default_avatar.png';
    this.avatarSrc = '/images/my/register.png';

    this.state = {
      src: this.configSrc(props),
      ratio: 0,
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
    }
    img.onload = function imgload() {
      if (img.width === img.height) {
        this.setState({
          ratio: 1,
        });
      }
    };
    this.imgload();
  }

  configSrc(props) {
    const isAvatar = this.props.isAvatar;
    let src = this.props.src;
    if (isAvatar) {
      src = props.src || this.avatarSrc;
    } else {
      src = props.src || this.logoSrc;
    }

    return src;
  }

  render() {
    const src = this.state.src;
    const ratio = this.state.ratio;
    const isAvatar = this.props.isAvatar;

    return (<div
      className={classnames({
        'avatar-box': ratio,
        'avatar-center': !ratio,
        'avatar-square': !isAvatar,
        'avatar-round': isAvatar,
      })}
      style={{ backgroundImage: { src } }}
    />);
  }

}

export default Avatar;
