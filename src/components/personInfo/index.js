/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './index.css';
import Link from '../link/link';
import Avatar from '../avatar/avatar';

class personInfo extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const data = this.props.data;
    return (

      <div className="component-page-starmodel-top">
        <Avatar src={data.avatars} size={{ width: 60, height: 60, radius: 4 }} className="component-page-starmodel-top-avatar" />
        <div className="component-page-starmodel-top-main">
          <div className="component-page-starmodel-top-info-title">{data.name}{this.props.isEntry ? <i className="component-page-starmodel-top-info-more" /> : null}</div>
          <div className="component-page-starmodel-top-info-status">政治面貌:&nbsp;&nbsp;{data.political_affiliation}</div>
          <div className="component-page-starmodel-top-info-status">单位名称:&nbsp;&nbsp;{data.workplace}</div>
        </div>
      </div>

    );
  }
}

personInfo.propTypes = {
  data: PropTypes.shape({}),
  isEntry: PropTypes.bool,
};

export default personInfo;
