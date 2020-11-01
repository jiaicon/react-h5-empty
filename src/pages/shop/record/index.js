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
import { translate } from 'react-i18next';
import i18next from 'i18next';
import ShopItem from '../../../components/shopItme/index';
import { ordersAction, sureOrdersAction } from '../shop.store';
import './index.css';
import { isWindowReachBottom } from '../../../utils/funcs';
class RecordPagr extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

    }


    componentWillMount() {
        this.requestList(false);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const {sureOrder:LsureOrder}=this.props;
        const {sureOrder:NsureOrder}=nextProps;
        if(LsureOrder.fetching && !LsureOrder.failed &&!NsureOrder.fetching && !NsureOrder.failed  ){
            this.requestList(false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll() {
        if (isWindowReachBottom(50)) {
            this.requestList(true);
        }
    }

    requestList(more) {
        const { orderList: { data: listData, fetching } } = this.props;

        if (fetching ||
            (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
            return;
        }
        this.props.ordersAction({
            current_page: more ? listData.page.current_page + 1 : 1,
            more,
        });
    }
    render() {
        const { orderList: { data: listData }, t } = this.props;
        const showLoadingMore = listData &&
            listData.page && (listData.page.current_page < listData.page.total_page);
        return (
            <div className="page-shop-orders-main-container">
                <ShopItem isntIndex={true} orderData={listData ? listData.list : null} isSure={this.props.sureOrdersAction}/>
                {
                    showLoadingMore
                        ?
                        <div className="component-loading-more">
                            <img src="/images/icon_loading.png" alt="loading" />
                          {t('正在加载')}
                         </div>
                        : null
                }
            </div>
        );
    }
}


RecordPagr.title = i18next.t('兑换记录');

RecordPagr.propTypes = {
    ordersAction: PropTypes.func,
    orderList: PropTypes.shape({}),
    sureOrder: PropTypes.shape({}),
    sureOrdersAction: PropTypes.func,
};

export default connect(
    state => ({
        orderList: state.shop.orderList,
        sureOrder: state.shop.sureOrder,
    }),
    dispatch => bindActionCreators({
        ordersAction,
        sureOrdersAction
    },
        dispatch),
)(translate('translations')(RecordPagr));
