import React, { PropTypes } from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import moment from 'moment'
import Link from './../../components/link/link'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { demandInfo } from './demand.store'
import './result.css'

class DemandResult extends React.Component {
  constructor (props) {
    super(props)
    autoBind(this)
    console.log(props)
    this.demandId = props.route.params.demandId
  }

  componentDidMount () {
    this.props.demandInfo(this.demandId)
  }

  componentWillUnmount () {
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {
    const windowHeight = document.documentElement.clientHeight
    console.log(this.props)
    const {info: {data}} = this.props
    if (!data) {
      return <div></div>
    }
    document.title = data.title
    return (
      <div className="demand-result" style={{minHeight: `${windowHeight}px`}}>
        <div className="demand-result-top">
          <div className="demand-result-top-title">{data.title}</div>
          <div className="demand-result-item-detail"
               style={{marginTop: '17px'}}>
            <div>
              <i className="demand-icon-people"></i>
              <span>发起人：{data.name}</span>
            </div>
            <div>
              <i className="demand-icon-time"></i>
              <span>{moment(data.created_at).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          <div className="demand-result-item-detail"
               style={{marginTop: '17px'}}>
            <div>
              <i className="demand-icon-category"></i>
              <span>求助类别：{data.category}</span>
            </div>
          </div>
          <div className="demand-result-item-detail"
               style={{marginTop: '17px'}}>
            <div>
              <i className="demand-icon-addr"></i>
              <span>{data.addr}</span>
            </div>
          </div>
        </div>
        {
          data.team_id ? <div>
            <div style={{height: '15px'}}></div>
            <Link to={`/team/detail/${data.team_id}`}
                  className="demand-result-line">
              <div className="demand-result-line-label">服务团队</div>
              <div className="demand-result-line-value">
                {data.team_name}<i className="sponsor-icon-right-arrow"></i>
              </div>
            </Link>
          </div> : null
        }
        {
          data.project_id ? <div>
            <div style={{height: '15px'}}></div>
            <Link to={`/project/detail/${data.project_id}`}
                  className="demand-result-line">
              <div className="demand-result-line-label">相关项目</div>
              <div className="demand-result-line-value">
                {data.project_name}<i className="sponsor-icon-right-arrow"></i>
              </div>
            </Link>
          </div> : null
        }
        <div style={{height: '15px'}}></div>
        <div className="demand-result-line-text">
          <div className="demand-result-line-text-title">求助信息</div>
          <div className="demand-result-line-text-content">
            {data.content}
          </div>
        </div>
        {
          data.result ? <div>
            <div style={{height: '15px'}}></div>
            <div className="demand-result-line-text">
              <div className="demand-result-line-text-title">结项报告</div>
              <div className="demand-result-line-text-content">
                {data.result}
              </div>
            </div>
          </div> : null
        }
        <div style={{height: '25px'}}></div>
      </div>)
  }
}

DemandResult.propTypes = {
  demandInfo: PropTypes.func,
}

// DemandResult.title = "结果，动态";

export default connect(
  state => ({
    info: state.demand.demandInfo,
  }),
  dispatch =>
    bindActionCreators(
      {
        demandInfo
      },
      dispatch
    )
)(DemandResult);
