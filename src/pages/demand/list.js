import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import classnames from "classnames";
import history from '../history';
import { bindActionCreators } from "redux";
import { saveDemandTabIndex } from "./demand.store";
import Tab from "../../components/tab/tab";
import DemandItem from "../../components/demand_item/index";
import "./demand.css";


class DemandList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onTabChange(idx) {
    this.props.saveDemandTabIndex(idx);
  }

  publicDemand(publicDemand) {
    return(<div>
      {
        publicDemand.length && publicDemand.map((item, index)=>(<DemandItem key={index} />))
      }
    </div>)
  }

  myDemand() {
    return(<div>
      myDemand
    </div>)
  }

  sponsor(e) {
    e.preventDefault();
    history.push('/demand/sponsor');
  }
  render() {
    const { demand: { demandTab } } = this.props;
    const publicDemand = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
    const windowHeight = document.documentElement.clientHeight;
    return(<div className="demand">
      <Tab
        tabs={[
          { label: "群众需求", component: this.publicDemand(publicDemand) },
          { label: "我的需求", component: this.myDemand() }
        ]}
        onChange={this.onTabChange}
        selectedIndex={demandTab.tabIndex}
      />
      <div className="demand-space" style={{minHeight: `${windowHeight - 50 - publicDemand.length * 130}px`}}></div>
      <div className="demand-sponsor" onClick={(e)=>{this.sponsor(e)}}>发起</div>
    </div>)
  }
}

DemandList.propTypes = {
  saveDemandTabIndex: PropTypes.func,
};

DemandList.title = "求助";

export default connect(
  state => ({
    demand: state.demand,
  }),
  dispatch =>
    bindActionCreators(
      {
        saveDemandTabIndex
      },
      dispatch
    )
)(DemandList);
