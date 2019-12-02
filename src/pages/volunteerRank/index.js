import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import classnames from "classnames";
import history from '../history';
import { bindActionCreators } from "redux";
import { saveRankTabIndex, volunteerRankYearList, volunteerRankAllList } from "./index.store";
import Tab from "../../components/tab/tab";
import Link from "../../components/link/link";
import Avatar from "../../components/avatar/avatar";

import "./index.css";


class Index extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {}
  }

  componentDidMount() {
    this.fetchVolunteerRankAllList();
  }

  componentWillUnmount() {
  }
  componentWillReceiveProps(nextProps) {

  }

  onTabChange(idx) {
    this.props.saveRankTabIndex(idx);
    if(idx == 1) {
      this.fetchVolunteerRankYearList();
    } else {
      this.fetchVolunteerRankAllList();
    }
  }

  fetchVolunteerRankYearList() {
    this.props.volunteerRankYearList();
  }

  fetchVolunteerRankAllList() {
    this.props.volunteerRankAllList();
  }

  allRank() {
    const { volunteerRank: { volunteerRankAllList: { data } } } = this.props
    if (!data) {
      return null;
    }
    // 拆分，顶部三个
    const top = data.splice(0, 3);
    const bot = data.splice(0);
    return(<div>
      {this.basicTopComponent(top)}
      {this.basicBotComponent(bot)}
    </div>)
  }

  yearRank() {
    const { volunteerRank: { volunteerRankYearList: { data } } } = this.props
    if (!data) {
      return null;
    }
    // 拆分，顶部三个
    const top = data.splice(0, 3);
    const bot = data.splice(0);
    return(<div>
      {this.basicTopComponent(top)}
      {this.basicBotComponent(bot)}
    </div>)
  }

  basicTopComponent(list) {
    if(!list) {
      return null;
    }
    if(!list.length) {
      return null;
    }
    return(<div className="volunteer-rank-top">
      <div className="volunteer-rank-top-avatar">
        <Link to={`/volunteer_rank/${list[1].user_id}`} className="volunteer-rank-top-left">
          <Avatar src={list[1].user && list[1].user.avatars} size={{width: 72, height: 72}}/>
          <i className="volunteer-rank-top-second-king"></i>
          <i className="volunteer-rank-top-second-plate"></i>
        </Link>
        <Link to={`/volunteer_rank/${list[0].user_id}`} className="volunteer-rank-top-center">
          <Avatar src={list[0].user && list[0].user.avatars} size={{width: 90, height: 90}}/>
          <i className="volunteer-rank-top-first-king"></i>
          <i className="volunteer-rank-top-first-plate"></i>
        </Link>
        <Link to={`/volunteer_rank/${list[2].user_id}`} className="volunteer-rank-top-right">
          <Avatar src={list[2].user && list[2].user.avatars} size={{width: 72, height: 72}}/>
          <i className="volunteer-rank-top-third-king"></i>
          <i className="volunteer-rank-top-third-plate"></i>
        </Link>
      </div>
      <div className="volunteer-rank-top-name">
        <Link to={`/volunteer_rank/${list[1].user_id}`}>
          <p>{list[1].real_name.length ? list[1].real_name : list[1].user.username}</p>
          <p className="volunteer-rank-top-name-time">{Number(list[1].reward_time).toFixed(2)}时</p>
        </Link>
        <Link to={`/volunteer_rank/${list[0].user_id}`}>
          <p>{list[0].real_name.length ? list[0].real_name : list[0].user.username}</p>
          <p className="volunteer-rank-top-name-time">{Number(list[0].reward_time).toFixed(2)}时</p>
        </Link>
        <Link to={`/volunteer_rank/${list[2].user_id}`}>
          <p>{list[2].real_name.length ? list[2].real_name : list[2].user.username}</p>
          <p className="volunteer-rank-top-name-time">{Number(list[2].reward_time).toFixed(2)}时</p>
        </Link>
      </div>
    </div>)
  }

  basicBotComponent(list) {
    if(!list) {
      return null;
    }
    if(!list.length) {
      return null;
    }
    return(<div className="volunteer-rank-bot">
      {
        list.map((item, index) => (<Link to={`/volunteer_rank/${item.user_id}`} key={index} className="volunteer-rank-bot-box">
          <div className="volunteer-rank-bot-box-sort">{index + 4}</div>
          <Avatar size={{width: 50, height: 50}} src={item.user.avatars}/>
          <div className="volunteer-rank-bot-box-detail">
            <div className="volunteer-rank-bot-box-detail-name">{item.real_name && item.real_name.length ? item.real_name : item.user.username}</div>
            <div className="volunteer-rank-bot-box-detail-time">{Number(item.reward_time).toFixed(2)}时</div>
          </div>
        </Link>))
      }
    </div>)
  }

  render() {
    const { volunteerRank: { rankReducerTab } } = this.props;
    return(<div className="demand">
      <Tab
        tabs={[
          { label: "总榜", component: this.allRank() },
          { label: "年度榜", component: this.yearRank() }
        ]}
        onChange={this.onTabChange}
        selectedIndex={rankReducerTab.tabIndex || 0}
      />
    </div>)
  }
}

Index.propTypes = {
  saveRankTabIndex: PropTypes.func,
  volunteerRankYearList: PropTypes.func,
  volunteerRankAllList: PropTypes.func,
};

Index.title = "志愿排行";

export default connect(
  state => ({
    volunteerRank: state.volunteerRank,
  }),
  dispatch =>
    bindActionCreators(
      {
        saveRankTabIndex,
        volunteerRankYearList,
        volunteerRankAllList
      },
      dispatch
    )
)(Index);
