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


import ShopItem from '../../../components/shopItme/index';
import { ordersAction } from '../shop.store';
import './index.css';

class RecordPagr extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
       
    }


    componentWillMount() {
        this.props.ordersAction();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    render() {

        return (
            <div className="page-shop-orders-main-container">
                <ShopItem isntIndex={true}/>
            </div>
        );
    }
}


RecordPagr.title = '兑换记录';

RecordPagr.propTypes = {
    ordersAction: PropTypes.func,
    detail: PropTypes.shape({}),
};

export default connect(
    state => ({
        detail: state.shop.detail,
    }),
    dispatch => bindActionCreators({
        ordersAction
    },
        dispatch),
)(RecordPagr);
