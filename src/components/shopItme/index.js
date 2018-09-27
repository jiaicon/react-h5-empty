/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './index.css';
import Link from '../link/link';
import Image from '../image/image';
import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';
const scoreName = window.orgInfo.score_name;
function isInTimeArea(t1, t2, t3) {

    var begin = new Date(t1.replace(/-/g, "/"));
    var end = new Date(t2.replace(/-/g, "/"));
    var now = t3 ? t3 : new Date();
    var str = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

    var strD = Date.parse(str.replace(/-/g, "/"));

    var endD = Date.parse(end);
    var beginD = Date.parse(begin);

    if (t1 == t2) {
        endD = Number(endD) + 86400;
    }
    if (Number(strD) - Number(endD) > 0) {
        //结束
        return 1;
    } else if (Number(strD) >= Number(beginD)  && Number(endD) >= Number(strD)) {
        // 区间
        return 0;
    } else if (Number(beginD) - Number(strD) > 0) {
        // 未到
        return -1;
    }
}
class Projects extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
            showDialog: false
        })
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
                        this.props.isSure(this.sureId);
                    },
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() { }
    renderIndexItem() {
        const { data } = this.props;
        if (!data) {
            return null;
        } else if (data && !data.length) {
            return <div className="data-empty-tip">目前还没有商品哦</div>;
        }
        return (
            <ul className="component-shopItem">
                {
                    data.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={`/shop/goods/${item.id}`}>
                                    <div className="component-shopItem-container">
                                        <Image src={item.thumbnail} className="image" defaultSrc="/images/my/banner.png" />
                                        <div className="component-shopItem-content">
                                            <div className="component-shopItem-name-container">
                                                <div className="component-shopItem-name">{item.g_name}</div>
                                                <div className="component-shopItem-condition">{item.condition}</div>
                                            </div>
                                            <div className="component-shopItem-price-container">
                                                <div className="new">{item.points}</div>
                                                <div className="fonts">{scoreName || '星币'}</div>
                                                <div className="old">¥{item.price}元</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line1px" />
                                </Link>
                            </li>
                        )
                    })
                }


            </ul>
        );
    }
    onSure(id) {
        this.sureId = id;
        this.setState({ ...this.state, showDialog: true });
    }
    renderOrderList() {
        const { orderData } = this.props;
        if (!orderData) {
            return null;
        } else if (orderData && !orderData.length) {
            return <div className="data-empty-tip">目前还没有订单哦</div>;
        }
        return (
            <ul className="component-shopItem">
                {
                    orderData.map((item) => {
                        let time = 0;
                        if (item.goods_id) {
                            console.log(item.goods_id.start_time)
                            console.log(item.goods_id.end_time)
                            time = isInTimeArea(item.goods_id.start_time, item.goods_id.end_time);
                            console.log(time)
                        }
                        return (
                            <div>
                                <li key={item.id}>
                                    <div className="component-shopItem-container">
                                        <Image src={item && item.goods_id && item.goods_id.thumbnail ? item.goods_id.thumbnail : ''} className="image" defaultSrc="/images/my/banner.png" />
                                        <div className="component-shopItem-content">
                                            <div className="component-shopItem-name-container">
                                                <div className="component-shopItem-name">{item && item.goods_id && item.goods_id.g_name ? item.goods_id.g_name : null}</div>
                                                <div className="component-shopItem-condition">{item && item.goods_id && item.goods_id.condition ? item.goods_id.condition : null} </div>
                                            </div>

                                            <div className="component-shopItem-price-container">
                                                <div className="new">{item && item.goods_id && item.goods_id.points ? item.goods_id.points : null}</div>
                                                <div className="fonts">{scoreName || '星币'}</div>
                                                <div className="old">¥{item && item.goods_id && item.goods_id.price ? item.goods_id.price : null}元</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line1px" />
                                    <div className="component-shopItem-order-container">
                                        <div className="component-shopItem-order-time">下单时间：{item.updated_at}</div>
                                        {
                                            item.state ?
                                                <div className="component-shopItem-order-time">兑换时间：{item.collect_time}</div> : null}
                                        {

                                            !item.state && item.status == 0 && time == -1 ? <div className="component-shopItem-order-btn-end">未到兑换日期</div> : null
                                        }
                                        {

                                            !item.state && item.status == 0 && time == 0 ? <div className="component-shopItem-order-btn" onClick={() => this.onSure(item.id)}>确认已兑换</div> : null
                                        }
                                        {

                                            !item.state && item.status == 0 && time == 1 ? <div className="component-shopItem-order-time">兑换失败，商品已过兑换日期（不返还积分）</div> : null
                                        }
                                        {
                                            !item.state && item.status == 1 ? <div className="component-shopItem-order-time">兑换失败：{item.reason}</div> : null}
                                        {
                                            !item.state && item.status == 2 ? <div className="component-shopItem-order-time component-shopItem-order-time-fonts-color">审核中</div> : null
                                        }

                                    </div>

                                    <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
                                        确认是否已兑换
                                    </Dialog>
                                </li>
                                <div className="takeupborder" />
                            </div>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        const { isntIndex } = this.props;

        return (
            <div>
                {!isntIndex ? this.renderIndexItem() : this.renderOrderList()}
            </div>
        );
    }
}

Projects.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({

        })),
    isntIndex: PropTypes.bool,
    isSure: PropTypes.func,
    orderData: PropTypes.arrayOf(
        PropTypes.shape({

        })),
};

export default Projects;
