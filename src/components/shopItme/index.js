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
                                            <div className="component-shopItem-name">{item.g_name}</div>
                                            <div className="component-shopItem-condition">{item.condition}</div>
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
    renderOrderList() {
        return (
            <ul className="component-shopItem">
                <Link to=''>
                    <li >
                        <div className="component-shopItem-container">
                            <Image src={'123'} className="image" defaultSrc="/images/my/banner.png" />
                            <div className="component-shopItem-content">
                                <div className="component-shopItem-name">1231</div>
                                <div className="component-shopItem-condition">123}</div>
                                <div className="component-shopItem-price-container">
                                    <div className="new">123123}</div>
                                    <div className="fonts">星币</div>
                                    <div className="old">¥123123元</div>
                                </div>
                            </div>
                        </div>
                        <div className="line1px" />
                        <div className="component-shopItem-order-container">
                            <div className="component-shopItem-order-time">下单时间：2018-08-26 14:21:34</div>
                            <div className="component-shopItem-order-time">已兑换／发货时间：2018-2-14 12:33</div>
                            <div  className="component-shopItem-order-btn">确认已兑换</div>
                        </div>


                    </li>
                    <div className="takeupborder" />
                </Link>

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
};

export default Projects;
