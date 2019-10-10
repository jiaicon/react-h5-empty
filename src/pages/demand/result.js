import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import './result.css';


class DemandResult extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const windowHeight = document.documentElement.clientHeight;

    return(<div className="demand-result" style={{minHeight: `${windowHeight}px`}}>
      <div className="demand-result-top">
        <div className="demand-result-top-title">志多星关注程序员健康志多星关注程序员健康</div>
        <div className="demand-result-item-detail" style={{marginTop: '17px'}}>
          <div>
            <i className="demand-icon-people"></i>
            <span>发起人：某用户</span>
          </div>
          <div>
            <i className="demand-icon-time"></i>
            <span>2019-10-19</span>
          </div>
        </div>
        <div className="demand-result-item-detail" style={{marginTop: '17px'}}>
          <div>
            <i className="demand-icon-people"></i>
            <span>求助类别：困难帮扶</span>
          </div>
        </div>
        <div className="demand-result-item-detail" style={{marginTop: '17px'}}>
          <div>
            <i className="demand-icon-people"></i>
            <span>北京市海淀区程序员小区</span>
          </div>
        </div>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="demand-result-line">
        <div className="demand-result-line-label">服务团队</div>
        <div className="demand-result-line-value">
          儿童基金会<i className="sponsor-icon-right-arrow"></i>
        </div>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="demand-result-line">
        <div className="demand-result-line-label">相关项目</div>
        <div className="demand-result-line-value">
          孤寡老人某某项目<i className="sponsor-icon-right-arrow"></i>
        </div>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="demand-result-line-text">
        <div className="demand-result-line-text-title">求助信息</div>
        <div className="demand-result-line-text-content">
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
        </div>
      </div>
      <div style={{height: '15px'}}></div>
      <div className="demand-result-line-text">
        <div className="demand-result-line-text-title">结项报告</div>
        <div className="demand-result-line-text-content">
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
          想一起去旅行，守护大自然，致力于全球保护具有重要生态价值的陆地和水域，维护自然环境，提升人类福祉，只要你有热情，请加入我们！
        </div>
      </div>
      <div style={{height: '25px'}}></div>
    </div>)
  }
}

DemandResult.propTypes = {
};

DemandResult.title = "结果，动态";

export default connect(
  state => ({
  }),
  dispatch =>
    bindActionCreators(
      {
      },
      dispatch
    )
)(DemandResult);
