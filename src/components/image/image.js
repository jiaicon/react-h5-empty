import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';

class Image extends React.Component {

  static propTypes = {
    src: PropTypes.string,
    // 图片裁剪配置[100, 200]
    resize: PropTypes.arrayOf(PropTypes.number),
    // 默认图片，当图片无法正常展示是显示
    defaultSrc: PropTypes.string,
  }

  constructor(props) {
    super(props);
    autoBind(this);

    this.defaultSrc = '/images/default_avatar.png';

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

  configSrc(props) {
    let src = props.src || props.defaultSrc || this.defaultSrc;
    const resize = (props.resize || []);
    const { width, height } = resize;

    if (resize.length) {
      src = `${src}?${width || 0}x${height || 0}`;
    }

    return src;
  }

  handleError() {
    this.setState({
      ...this.state,
      src: this.props.defaultSrc || this.defaultSrc,
    });
  }

  render() {
    const props = {
      ...this.props,
      src: this.state.src,
    };

    delete props.defaultSrc;
    delete props.resize;

    return <img {...props} onError={this.handleError} alt=" " />;
  }

}

export default Image;
