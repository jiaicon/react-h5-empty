import React, { PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Link from './../link/link';
import './index.css';

class DemandItem extends React.Component {

  static propTypes = {
    data: PropTypes.shape({}),
  };

  render() {
    const { data } = this.props;
    return (<Link to={`/demand/result/${data.id}`} className="demand-list-item">
      <div className="demand-list-item-space"></div>
      <div className="demand-list-item-box">
        <i className={classnames({
          'demand-list-item-service': data.status == 1,
          'demand-list-item-complete': data.status == 2,
          'demand-list-item-wait': data.status == 0,
          'demand-list-item-reject': data.status == 3,
        })}></i>
        <div className="demand-list-item-title">{data.title}</div>
        <div className="demand-list-item-detail" style={{marginTop: '17px'}}>
          <div>
            <i className="demand-icon-people"></i>
            <span>发起人：{data.name}</span>
          </div>
          <div>
            <i className="demand-icon-time"></i>
            <span>{moment(data.created_at).format('YYYY-MM-DD')}</span>
          </div>
        </div>
        <div className="demand-list-item-detail" style={{marginTop: '7px'}}>
          <div>
            <i className="demand-icon-team"></i>
            <span>服务团队：{data.team_name}</span>
          </div>
        </div>
      </div>
    </Link>);
  }

}

export default DemandItem;
