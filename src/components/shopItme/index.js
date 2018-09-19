/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './index.css';
import Link from '../link/link';
import Image from '../image/image';

class Projects extends React.Component {

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
                                        <Image src={item.g_img} className="image" defaultSrc="/images/my/banner.png" />
                                        <div className="component-shopItem-content">
                                            <div className="component-shopItem-name-container">
                                                <div className="component-shopItem-name">{item.g_name}</div>
                                                <div className="component-shopItem-condition">{item.condition}</div>
                                            </div>
                                            <div className="component-shopItem-price-container">
                                                <div className="new">{item.points}</div>
                                                <div className="fonts">星币</div>
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
        this.props.isSure(id);
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
                        return (
                            <Link to=''>
                                <li >
                                    <div className="component-shopItem-container">
                                        <Image src={item && item.goods_id && item.goods_id.thumbnail ? item.goods_id.thumbnail : ''} className="image" defaultSrc="/images/my/banner.png" />
                                        <div className="component-shopItem-content">
                                            <div className="component-shopItem-name-container">
                                                <div className="component-shopItem-name">{item && item.goods_id && item.goods_id.g_name ? item.goods_id.g_name : null}</div>
                                                <div className="component-shopItem-condition">{item && item.goods_id && item.goods_id.condition ? item.goods_id.condition : null} </div>
                                            </div>

                                            <div className="component-shopItem-price-container">
                                                <div className="new">{item && item.goods_id && item.goods_id.points ? item.goods_id.points : null}</div>
                                                <div className="fonts">星币</div>
                                                <div className="old">¥{item && item.goods_id && item.goods_id.price ? item.goods_id.price : null}元</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line1px" />
                                    <div className="component-shopItem-order-container">
                                        <div className="component-shopItem-order-time">下单时间：{item.updated_at}</div>
                                        {
                                            item.state ?
                                                <div className="component-shopItem-order-time">已兑换／发货时间：{item.collect_time}</div> : null}
                                        {

                                            !item.state && item.status == 0 ? <div className="component-shopItem-order-btn" onClick={() => this.onSure(item.id)}>确认已兑换</div> : null}
                                        {
                                            !item.state && item.status == 1 ? <div className="component-shopItem-order-time">兑换失败：{item.reason}</div> : null}
                                        {
                                            !item.state && item.status == 2 ? <div className="component-shopItem-order-time component-shopItem-order-time-fonts-color">审核中</div> : null
                                        }

                                    </div>


                                </li>
                                <div className="takeupborder" />
                            </Link>
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
