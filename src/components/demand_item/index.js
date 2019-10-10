import React, { PropTypes } from 'react';
import './index.css';

class DemandItem extends React.Component {

  static propTypes = {
    demand: PropTypes.shape({}),
  };

  render() {
    return (<div className="demand-list-item">
      <div className="demand-list-item-space"></div>
      <div className="demand-list-item-box">
        <i className="demand-list-item-service"></i>
        <div className="demand-list-item-title">项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称</div>
        <div className="demand-list-item-detail" style={{marginTop: '17px'}}>
          <div>
            <i className="demand-icon-people"></i>
            <span>发起人：某用户</span>
          </div>
          <div>
            <i className="demand-icon-time"></i>
            <span>2019-10-19</span>
          </div>
        </div>
        <div className="demand-list-item-detail" style={{marginTop: '7px'}}>
          <div>
            <i className="demand-icon-team"></i>
            <span>服务团队：儿童基金会</span>
          </div>
        </div>
      </div>
    </div>);
  }

}

export default DemandItem;
