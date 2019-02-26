/* eslint  "class-methods-use-this":"off", "react/no-array-index-key":"off" */

import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import Link from '../link/link';
import './menus.css';

const DEFAULT_LINK = '/building';
const MODULE_LINK = {
  volunteer_project: '/project/list',
  volunteer_team: '/team/list',
  reward_history: '/my/duration/applys',
  help_center: '/my/service',
  联盟互动: 'https://buluo.qq.com/p/barindex.html?bid=334308&from=wechat',
  volunteer_strategy: 'http://m.guide.volunteerzhiduoxing.cn',
  1234: 'http://sanlitunweb.parkingkj.com/showhtml/sayvillage.html',
  // volunteer_feedback: `http://${location.host}/tmall`,
  volunteer_feedback: '/shop',
  volunteer_ensure: '/ensure',
  good_example: '/sanlitun/starModel',
  claim_project: '/sanlitun/projectClaim/list',
  community_interact: '/my/circlevisits',
  funding_application: '/funding_application/step_one',
};

class Menus extends React.Component {

  static propTypes = {
    menus: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  }

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      menus: this.transformData(props.menus),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus) {
      this.setState({
        menus: this.transformData(nextProps.menus),
      });
    }
  }

  transformData(menus) {
    const newMenus = [];

    menus.forEach((menuLine, idx) => {
      newMenus.push([]);
      menuLine.forEach((menu) => {
        newMenus[idx].push({
          ...menu,
          link: MODULE_LINK[menu.key] || DEFAULT_LINK,
        });
      });
    });

    return newMenus;
  }

  render() {
    const { menus } = this.state;

    return (<ul className="component-menus">
      {
        menus.map((menusInLine, idx) => <li key={idx}>
          {
              menusInLine.map(menu => <Link key={menu.label} to={menu.link}>
                <div className="menu-icon" style={{ backgroundImage: `url(${menu.icon})` }} />
                <span>{menu.settings ? menu.settings.label : menu.label}</span>
              </Link>)
            }
        </li>)
      }
    </ul>);
  }

}

export default Menus;
