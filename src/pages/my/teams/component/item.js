/**
 * @file 志愿团队项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import Link from '../../../../components/link/link';
import './style.css';

class Item extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props.data);
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}
  render() {
    const item = this.props.data;
    return (
      <div>
        <div className="page-teams-item-container">
          <div className="page-teams-item-logo-container">
            <img src={item.logo} className="page-teams-item-logo" alt="logo" />
          </div>

          <div className="page-teams-item-main">
            <div className="page-teams-item-main-top">
              <span className="page-teams-item-main-top-fonts">{item.name}</span>
              <div
                className={cx({
                  'page-teams-item-main-top-state': true,
                  'page-teams-item-main-top-state-hidden': item.join_status,
                })
              }
              >审核中</div>
            </div>
            <div className="page-teams-item-main-bottom">
              <div className="page-teams-item-main-bottom-time">
                <img src="/images/my/duration.png" className="page-teams-item-main-bottom-icon" alt="icon" />
                <p>时长:{item.time_long}小时</p>
              </div>
              <div className="page-teams-item-main-bottom-time">
                <img src="/images/my/people.png" className="page-teams-item-main-bottom-icon" alt="icon" />
                <p>成员:{item.team_size ? item.team_size : 0}人</p>
              </div>

            </div>

          </div>

        </div>
        <div className="line1px" />
      </div>
    );
  }

}


Item.title = 'item-list';

Item.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    team_size: PropTypes.number,
    identifier: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    contact_addr: PropTypes.string,
    parent_id: PropTypes.number,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    time_long: PropTypes.number,
    abstract: PropTypes.string,
    created_at: PropTypes.string,
    category: PropTypes.shape({}),
    join_status: PropTypes.number,
  }),
};


export default Item;

