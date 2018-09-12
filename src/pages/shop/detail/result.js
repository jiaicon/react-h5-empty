/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Link from '../../../components/link/link';
import { requestGoodsDetail, changeOrdersAction } from '../shop.store';
import './result.css';
import {getQueryString} from '../../../utils/funcs';
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
        console.log(this.state.typeId)
        if (this.state.typeId == 1) {
            document.title = "兑换成功"
        } else {
            document.title = "审核中"
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }
    renderSuccess() {
        return (
            <div className="page-shop-result-container">
                <img src="/images/shop/success.png" />
                <div className="page-shop-result-title">恭喜，兑换成功</div>
                <div className="page-shop-result-points">支付金额：{this.state.dataInfo.points}积分</div>
                <div className="page-shop-result-points">下单时间：{this.state.dataInfo.time}</div>
                <Link to="/shop">
                    <div className="page-shop-result-btn">返回积分商城首页</div>
                </Link>

            </div>
        )
    }
    renderExamine() {
        return (
            <div className="page-shop-result-container">
                <img src="/images/shop/wait.png" />
                <div className="page-shop-result-title">审核中，请稍后...</div>
                <div className="page-shop-result-points">支付金额：{this.state.dataInfo.points}积分</div>
                <div className="page-shop-result-points">下单时间：{this.state.dataInfo.time}</div>
                <Link to="/shop">
                    <div className="page-shop-result-btn">返回积分商城首页</div>
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


// ResultPage.title = '';

ResultPage.propTypes = {

};

export default ResultPage;
