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

import Image from '../../../components/image/image';
import { requestGoodsDetail, changeOrdersAction } from '../shop.store';
import './index.css';
import history from '../../history';
import { userCenterAction } from '../../my/my.store';



import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';
class ShopDetailPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.Id = props.route.params.Id;
        this.state=({
            showDialog:false,
        })
        this.slickSettings = {
            dots: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
        };
        this.dialog = {
            title: '确认兑换',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: () => this.setState({ ...this.state, showDialog: false }),
                },
                {
                    type: 'primary',
                    label: '确认',
                    onClick: () => {
                        this.setState({ ...this.state, showDialog: false });
                        //   this.props.quitProject(this.projectId);
                        this.props.changeOrdersAction(this.Id)
                    },
                },
            ],
        };
    }


    componentWillMount() {
        this.props.requestGoodsDetail(this.Id)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { changeOrder: LchangeOrder } = this.props;
        const { changeOrder: NchangeOrder } = nextProps;
        if (LchangeOrder.fetching && !LchangeOrder.failed && !NchangeOrder.fetching && !NchangeOrder.failed) {
            if (NchangeOrder.data) {
                history.replace(`/shop/result/${NchangeOrder.data.msg}?data=${JSON.stringify(NchangeOrder.data)}`)
            }

        }
    }

    componentWillUnmount() { }

    renderSlick() {
        const { detail: { data } } = this.props;
        if (!data) {
            return null;
        }

        return (<div className="slick-container">

            <Image src={data.g_img} className="image" defaultSrc="/images/default_banner.png" />

        </div>);
    }
    renderDetail() {
        const { detail: { data } } = this.props;

        if (!data) {
            return null;
        }
        return (
            <div className="page-shop-goods-content-container">
                <div className="page-shop-goods-content-top">
                    <div className="page-shop-goods-content-top-title">{data.g_name}</div>
                    <div className="page-shop-goods-content-top-price-container">
                        <div className="price-container">
                            <div className="price"><span>{data.points}</span>星币</div>
                            <div className="now">¥{data.price}元</div>
                        </div>
                        {data.g_num ? <div className="num">库存{data.g_num}件</div> : null}
                        {/* <div className="num">库存{data.g_num}件</div> */}
                    </div>
                    {
                        data.condition ? <div className="page-shop-goods-content-top-condition">{data.condition}</div> : null
                    }

                    <div className="line1px"></div>
                    <div className="page-shop-goods-content-top-date">线下兑换日期:{data.created_at} 至 {data.updated_at}</div>
                    <div className="line1px"></div>
                    <div className="page-shop-goods-content-top-date">发起方：{data.team_info && data.team_info.name ? data.team_info.name : null}</div>
                    <div className="line1px"></div>
                    {data.sponsor ? <div className="page-shop-goods-content-top-date">支持方：{data.sponsor}</div> : null}

                </div>
                <div className="page-shop-goods-content-line"></div>
                <div className="page-shop-goods-content-bottom">
                    <div className="title">商品简介</div>
                    <div className="content" dangerouslySetInnerHTML={{
                        __html: data.content ?
                            data.content.replace(/(\n+)/g, '<br/>') : '暂无介绍'
                    }} />
                </div>
                <div className="page-shop-goods-takeup"></div>
                <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
                兑换该商品需要消耗{data.points}星币，您是否兑换吗？
                </Dialog>
            </div>
        )
    }
    onChange() {
        const { user } = this.props;
        if (user.isLogin) {
            this.setState({ ...this.state, showDialog: true });
        } else {
            this.props.userCenterAction();
        }
    }
    renderBtn() {
        const { detail: { data } } = this.props;

        if (!data) {
            return null;
        }
        const now = +new Date();
        const end = new Date(`${data.updated_at}`).getTime();
        return (
            <div>
                {
                    end - now > 1 * 60 * 1000 && (data.g_num > 0 || data.g_num == null) ?
                        <div className='page-shop-goods-main-btn' onClick={this.onChange}>立即兑换</div> :
                        <div className='page-shop-goods-main-btn-end'>兑换已结束</div>

                }
            </div>

        )
    }
    render() {

        return (
            <div className="page-shop-goods-main-container">
                {this.renderSlick()}
                {this.renderDetail()}
                {this.renderBtn()}
              
            </div>
        );
    }
}


ShopDetailPage.title = '商品详情';

ShopDetailPage.propTypes = {
    changeOrdersAction: PropTypes.func,
    requestGoodsDetail: PropTypes.func,
    detail: PropTypes.shape({}),
    changeOrder: PropTypes.shape({}),
    user: PropTypes.shape({}),
    userCenterAction: PropTypes.func,
};

export default connect(
    state => ({
        detail: state.shop.detail,
        changeOrder: state.shop.changeOrder,
        user: state.user,
    }),
    dispatch => bindActionCreators({
        requestGoodsDetail,
        changeOrdersAction,
        userCenterAction
    },
        dispatch),
)(ShopDetailPage);
