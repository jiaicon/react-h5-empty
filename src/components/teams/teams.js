import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './teams.css';
import Link from '../link/link';

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

    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">目前还没有志愿团队哦</div>;
    }

    return (
      <ul className="component-teams">
        {
          teams.map(team => (<li key={team.id}>
            <Link to={`/team/detail/${team.id}`}>
              <img src={team.logo} alt="头像" />
              <div>
                <div className="team-name">
                  {team.name}
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
  teams: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default Teams;
