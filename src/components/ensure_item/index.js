/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './index.css';
import Link from '../link/link';
import IMAGE from '../image/image';

class EnsureItem extends React.Component {

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
    return (
      <div className="component-ensure-container">
        <IMAGE src="/images/model.png" className="component-ensure-container-pic" />
        <div className="component-ensure-info-container">
          <div className="component-ensure-info-container-main">
            <div className="component-ensure-info-title">深秋季节，如何调理身体如何调理身</div>
            <div className="component-ensure-info-desc">保险简介保险简介保险简介保险简介保险简介</div>
          </div>
          <div className="component-ensure-info-ptice-container">
            <span className="component-ensure-info-ptice-now">¥<i>12312</i></span>
            <Link to="1">查看详情</Link>
          </div>
        </div>
      </div>
    );
  }
}

EnsureItem.propTypes = {
  durationProject: PropTypes.arrayOf(PropTypes.shape({

  })),
  isEntry: PropTypes.bool,
  HandleClick: PropTypes.func,
};

export default EnsureItem;
