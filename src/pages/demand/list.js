import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import classnames from "classnames";
import history from '../history';
import { bindActionCreators } from "redux";
import { saveDemandTabIndex, allDemandList, ownDemandList } from "./demand.store";
import Tab from "../../components/tab/tab";
import DemandItem from "../../components/demand_item/index";
import { isWindowReachBottom } from '../../utils/funcs';

import "./demand.css";


class DemandList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.page = 1;
  }

  componentDidMount() {
    this.fetchAllDemand(false);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  componentWillReceiveProps(nextProps) {
    // const {failed: tFailed, fetching: tFetching} = this.props.demandSubmitData;
  }
  fetchAllDemand(more) {
    const {allDemandList: {failed: tFailed, fetching: tFetching, data} } = this.props.demand;
    console.log(tFetching, data)
    if (tFetching || (data && (data.current_page >= data.last_page))) {
      return;
    }
    this.page = more ? this.page + 1 : this.page;
    this.props.allDemandList({
      page: this.page,
      more,
      page_size: 10,
    })
  }

  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.fetchAllDemand(true);
    }
  }

  fetchOwnDemand() {
    this.props.ownDemandList();
  }
  onTabChange(idx) {
    this.props.saveDemandTabIndex(idx);
    if(idx == 1) {
      this.fetchOwnDemand();
    } else {
      this.fetchAllDemand();
    }
  }

  publicDemand(data) {
    if(!data || !data.data || !data.data.list || !data.data.list.length) {
      return(<div className="demand-list-all-none">
        暂无信息
      </div>)
    }
    const publicDemand = data.data.list;
    return(<div>
      {
        publicDemand.length && publicDemand.map((item, index)=>(<DemandItem data={item} key={index} />))
      }
    </div>)
  }

  myDemand(data) {
    if(!data || !data.data || !data.data.length) {
      return(<div className="demand-list-all-none">
        暂无信息
      </div>)
    }
    const publicDemand = data.data;
    return(<div>
      {
        publicDemand.length && publicDemand.map((item, index)=>(<DemandItem data={item} key={index} />))
      }
    </div>)
  }

  sponsor(e) {
    e.preventDefault();
    history.push('/demand/sponsor');
  }
  render() {
    const { demand: { demandTab, allDemandList, ownDemandList} } = this.props;
    console.log(this.props);
    const showLoadingMore = allDemandList.data && (allDemandList.data.current_page < allDemandList.data.last_page)
    const windowHeight = document.documentElement.clientHeight;
    return(<div className="demand" style={{minHeight: `${windowHeight}px`}}>
      <Tab
        tabs={[
          { label: "群众需求", component: this.publicDemand(allDemandList) },
          { label: "我的需求", component: this.myDemand(ownDemandList) }
        ]}
        onChange={this.onTabChange}
        selectedIndex={demandTab.tabIndex}
      />
      <div className="demand-sponsor" onClick={(e)=>{this.sponsor(e)}}>发起</div>
      {
        showLoadingMore
          ?
          <div className="component-loading-more">
            <img src="/images/icon_loading.png" alt="loading" />
            正在加载
          </div>
          : null
      }
    </div>)
  }
}

DemandList.propTypes = {
  saveDemandTabIndex: PropTypes.func,
  allDemandList: PropTypes.func,
  ownDemandList: PropTypes.func,
};

DemandList.title = "求助";

export default connect(
  state => ({
    demand: state.demand,
  }),
  dispatch =>
    bindActionCreators(
      {
        saveDemandTabIndex,
        allDemandList,
        ownDemandList
      },
      dispatch
    )
)(DemandList);
