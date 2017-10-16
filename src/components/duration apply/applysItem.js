/**
 * @file 志愿项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';

import './applysItem.css';

class applysItem extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    } else if (data && !data.length) {
      return <div className="projects-empty-tip">目前还没有申请哦</div>;
    }
    return (

      <div className="page-applys-item-container">
        {
          data.map((data) => {
            const { team } = data;

            return (
              <div>
                <div className="page-applys-item-title">{team.name}</div>
                <div className="page-applys-item-date-box">
                  <div className="page-applys-item-date">申请补录时长<span>{data.reward_time}小时</span></div>
                  <div
                    className={classnames({
                      'page-applys-item-content-wait': data.verify_status === 1,
                      'page-applys-item-content-reject': data.verify_status === 3,
                      'page-applys-item-content-pass': data.verify_status === 2,
                    })}
                  />
                </div>
                <div className="line1px" />
              </div>
            );
          })
        }


      </div>
    );
  }
}


applysItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default applysItem;
