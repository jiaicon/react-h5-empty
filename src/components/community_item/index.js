/**
 * @file 社区项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import Link from '../link/link';
import AVATAR from '../avatar/avatar';
import IMAGE from '../image/image';
import './index.css';

class COMMUNITYITEM extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (

      <ul className="components-community-item-container">
        <li className="components-community-item">
          <AVATAR size={{ width: 40, radius: 4 }} className="components-community-item-avatar" />
          <div className="components-community-item-main">
            <p className="components-community-item-name">Joseph Elliott</p>
            <div
              className={classnames({
                ' components-community-item-content-style': true,
                'components-community-item-content-style-off': true,
                'components-community-item-content-style-on': false,
              })}
            >公益活动是现代社会条件下的产物，是公民参与精神的表征。公益活动要生产出有利于提升公共安全、有利于增加社会福利的公共产品。在组织公益活动时，要遵循公德、符合公意，努力形成参与者多赢共益的良好氛围。因而，公益活动至少应该</div>
            <div className="components-community-item-content-btn">查看全文</div>
          </div>
        </li>
      </ul >
    );
  }
}


COMMUNITYITEM.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default COMMUNITYITEM;
