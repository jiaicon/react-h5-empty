import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './avatar.css';


class Avatar extends React.Component {

  static propTypes = {
    src: PropTypes.string,
    defaultSrc: PropTypes.string,
    resize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      shape: PropTypes.number,
    }),


  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.logoSrc = '/images/default_avatar.png';

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

    const src = url || this.props.defaultSrc || this.logoSrc;
    img.onerror = function imgerror() {
      this.setState({
        src,
      });
    };
    this.imgerror();
  }

  configSrc(props) {
    let src = this.props.src || this.props.defaultSrc || this.logoSrc;
    const resize = (props.resize || []);
    const { width, height } = resize;
    if (width || height) {
      src = `${src}?${width || 0}x${height || 0}`;
    }
    return src;
  }

  render() {
    const src = this.state.src;
    const ratio = this.state.ratio;
    const width = this.props.resize.width;
    const height = this.props.resize.height;
    const shape = this.props.resize.shape;


    return (<div
      className={classnames({
        'component-avatar-norepeat': true,
        'component-avatar-size-cover': ratio,
        'component-avatar-postition-center': !ratio,
        'component-avatar-shape': true,
      })}
      style={{ backgroundImage: `url(${src})`, width: `${width || 20}px`, height: `${height || 20}px`, borderRadius: `${shape || ''}px` }}
    />);
  }

}

export default Avatar;
