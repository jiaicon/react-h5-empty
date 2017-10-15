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
  // volunteer_ensure: '/building',
  // volunteer_feedback: '/building',
  // volunteer_strategy: '/building',
  // community_interact: '/building',
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
        menus.map(menusInLine => <li>
          {
              menusInLine.map(menu => <Link to={menu.link}>
                <div className="menu-icon" style={{ backgroundImage: `url(${menu.icon})` }} />
                <span>{menu.label}</span>
              </Link>)
            }
        </li>)
      }
    </ul>);
  }

}

export default Menus;
