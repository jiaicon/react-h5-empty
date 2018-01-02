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
    const data = this.props.data;
    return (
      <div >
        {
          data.map(item => (<div className="component-ensure-container">
            <IMAGE src="/images/model.png" className="component-ensure-container-pic" />
            <div className="component-ensure-info-container">
              <div className="component-ensure-info-container-main">
                <div className="component-ensure-info-title">{item.name}</div>
                <div className="component-ensure-info-desc">{item.description}</div>
              </div>
              <div className="component-ensure-info-ptice-container">
                <span className="component-ensure-info-ptice-now">¥<i>{item.price}</i></span>
                <Link to={item.detail_link}>查看详情</Link>
              </div>
            </div>
          </div>))
        }
      </div>

    );
  }
}

EnsureItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default EnsureItem;
