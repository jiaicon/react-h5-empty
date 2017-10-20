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
      radius: PropTypes.number,
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
    const width = this.props.resize.width;
    const height = this.props.resize.height;
    const radius = this.props.resize.radius;


    return (<div
      className={classnames({
        'component-avatar': true,
      })}
      style={{ backgroundImage: `url(${src})`,
        width: `${width || 20}px`,
        height: `${height || 20}px`,
        borderRadius: `${radius || ''}px` }}
    />);
  }

}

export default Avatar;
