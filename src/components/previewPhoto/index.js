import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { Toast } from 'antd-mobile';

import { Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";


export default class PreviewPhoto extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}),
    preview: PropTypes.func,
    isBlock: PropTypes.bool
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { showMultiple: props.isBlock };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  onPhotoChange(e) {
    this.setState({ showMultiple: true });
  }
  render() {
    const BackButtonStyle = {
      display: "inline-block",
      width: "auto",
      color: "white",
      border: "none",
      position: "absolute",
      top: "5px",
      left: "15px"
    };
    const { data } = this.props;
    const { showMultiple } = this.state;
    // if (!data || !data.length) return;
    // console.log(data);
    // console.log(showMultiple);
    return (
      <div className="PreviewPhoto" >
        <Gallery src={data} show={showMultiple}>
          <Button
            style={BackButtonStyle}
            onClick={e => this.setState({ showMultiple: false })}
            plain
          >
            Back
          </Button>
        </Gallery>
      </div>
    );
  }
}


