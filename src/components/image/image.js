import autoBind from "react-autobind";
import React, { PropTypes } from "react";

class Image extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    // 图片裁剪配置[100, 200]
    resize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    // 默认图片，当图片无法正常展示是显示
    defaultSrc: PropTypes.string
  };

  constructor(props) {
    super(props);
    autoBind(this);

    this.defaultSrc = "/images/default_avatar.png";

    this.state = {
      src: this.configSrc(props),
      iserror: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      src: this.configSrc(nextProps)
    });
  }

  configSrc(props) {
    let src = props.src || props.defaultSrc || this.defaultSrc;
    const resize = props.resize || [];
    const { width, height } = resize;
    var img = document.createElement("img");
    img.src = `${src}`;
    const that = this;
    img.onerror = function () {
      that.setState({ iserror: true });
    };
    if (width || height) {
      src = `${src}?${width && width*2 || 0}x${height && height*2 || 0}`;
    }

    return src;
  }

  render() {
    const props = {
      ...this.props,
      src: this.state.src
    };
    const { iserror } = this.state;
    delete props.defaultSrc;
    delete props.resize;

    // const useDefault = !this.props.src || this.state.error;

    return (
      <div>
        <div
          {...props}
          style={{
            ...props.style,
            backgroundImage: `url(${
              iserror ? "/images/default_banner.png" : this.state.src
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
        {/* <image style={{}} src={`${this.state.src}`} onError={() => { console.log(11);this.setState({ iserror: true }) }} /> */}
      </div>
    );
  }
}

export default Image;
