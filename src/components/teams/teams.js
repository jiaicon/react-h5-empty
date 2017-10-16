import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import './teams.css';
import Link from '../link/link';
import Image from '../image/image';

class Teams extends React.Component {

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
    const { teams } = this.props;
    const showLabel = this.props.showLabel;
    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">目前还没有活动哦</div>;
    }
    return (
      <ul className="component-teams">
        {
          teams.map(team => (<li key={team.id}>
            <Link to={`/team/detail/${team.id}`}>
              <Image src={team.logo} alt="头像" />
              <div>
                <div className="team-name">
                  <div className="team-name-content">
                    {team.name}
                  </div>
                  {
                    showLabel ?
                      <div
                        className={cx({
                          'team-main-top-state': true,
                          'team-main-top-state-visiblehidden': team.join_status === 0,
                        })
                    }
                      >审核中</div> : null
                  }
                </div>

                <div className="team-info">
                  <span>时长：{team.reward_time} 小时</span>
                  <span>成员：{team.team_size} 人</span>
                </div>
              </div>
            </Link>
            <div className="line1px" />
          </li>))
        }
      </ul>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(
      PropTypes.shape({

      }),
  ),

  showLabel: PropTypes.bool,
};

export default Teams;
