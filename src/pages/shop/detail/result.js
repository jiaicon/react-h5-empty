/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Link from '../../../components/link/link';
import './result.css';
import {getQueryString} from '../../../utils/funcs';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class ResultPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            typeId: props.route.params.typeId,
            dataInfo:JSON.parse(decodeURIComponent(getQueryString('data'))),
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
      const { t } = this.props;
      if (this.state.typeId == 1) {
          document.title = t('兑换成功')
      } else {
          document.title = t('审核中')
      }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }
    renderSuccess() {
      const { t } = this.props;
        return (
            <div className="page-shop-result-container">
                <img src="/images/shop/success.png" />
                <div className="page-shop-result-title">{t('兑换成功')}</div>
                <div className="page-shop-result-points">{t('支付金额')}：{this.state.dataInfo.points}{t('积分')}</div>
                <div className="page-shop-result-points">{t('下单时间')}：{this.state.dataInfo.time}</div>
                <div className="page-shop-result-access">{this.state.dataInfo.access}</div>
                <Link to="/shop">
                    <div className="page-shop-result-btn">{t('返回积分商城首页')}</div>
                </Link>

            </div>
        )
    }
    renderExamine() {
      const { t } = this.props;
      return (
          <div className="page-shop-result-container">
              <img src="/images/shop/wait.png" />
              <div className="page-shop-result-title">{t('审核中，请稍后')}...</div>
              <div className="page-shop-result-points">{t('支付金额')}：{this.state.dataInfo.points}积分</div>
              <div className="page-shop-result-points">{t('下单时间')}：{this.state.dataInfo.time}</div>
              <Link to="/shop">
                  <div className="page-shop-result-btn">{t('返回积分商城首页')}</div>
              </Link>

          </div >
      )
    }
    render() {

        return (
            <div>
                {this.state.typeId == 1 ? this.renderSuccess() : this.renderExamine()}
            </div>
        );
    }
}

export default translate('translations')(ResultPage);
