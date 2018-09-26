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

import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from '../../components/image/image';
import Link from '../../components/link/link';
import ShopItem from '../../components/shopItme/index';
import { isWindowReachBottom } from '../../utils/funcs';
import { bannerAction, requestGoodsList } from './shop.store';
import { userCenterAction } from '../my/my.store';
import './index.css';
const scoreName =window.orgInfo.score_name;
class ShopPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.slickSettings = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };
  }


  componentWillMount() {
    const { user } = this.props;
    if (user.isLogin) {
      this.props.userCenterAction();
    }
    this.props.bannerAction();
    this.requestList(false);
  }

  componentDidMount() {
    this.refs.LaunchContent.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    this.refs.LaunchContent.removeEventListener('scroll', this.handleScroll);
  }
  requestList(more) {
    const { goods: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }
  
    this.props.requestGoodsList({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  handleScroll() {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    const isBottom = (clientHeight + scrollTop === scrollHeight);


    if (isBottom) {
      this.requestList(true)
    }

  }
  renderSlick() {
    const { banner: { data } } = this.props;
    if (!data || !data.length) {
      return <div className="slick-container slick-container-empty" />;
    }

    return (<div className="slick-container">
      <Slick {...this.slickSettings}>
        {data
          .map((item) => {
            let url = '';
            const mode = item.jump_mode;

            if (mode === 1) {
              url =`${item.href}`;
            } else if (mode === 2) {
              // 项目
              url = `/project/detail/${item.jump_id}`;
            } else if (mode === 3) {
              // 团队
              url = `/team/detail/${item.jump_id}`;
            }
              
                // <Image src={item.photo} key={item.id} className="image" defaultSrc="/images/my/banner.png" />
            return (
              <Link key={item.id} to={url}>
                <Image src={item.photo} className="image" defaultSrc="/images/my/banner.png" />
              </Link>
            )
          })}
      </Slick>

    </div>);
  }
  onLogin(){
    this.props.userCenterAction();
  }
  renderItem() {
    const { goods: { data: listData } } = this.props;
    return (
      <ShopItem data={listData && listData.list || null} />
    )
  }
  render() {
    const { goods: { data: listData }, user,usercenter } = this.props;
    const showLoadingMore = listData &&
      listData.page && (listData.page.current_page < listData.page.total_page);


    return (
      <div className="page-shop-main-container">
        <div className="page-shop-main-header">
          {
            user.isLogin ?

              <div className="left">我的{scoreName || '星币'}:<span>{usercenter && usercenter.data && usercenter.data.user && usercenter.data.user.score?usercenter.data.user.score:0}</span></div>

              :
              <div className="left">我的{scoreName || '星币'}:<span className="redfonts">请先登录</span></div>

          }
          {
            user.isLogin ?
              <Link to="/shop/record"><div className="right">兑换记录</div></Link>
              :
              <div className="right" onClick={this.onLogin}>前往登录</div>
          }
        </div>
        <div className="page-shop-content-header" ref="LaunchContent">
          {this.renderSlick()}
          {this.renderItem()}
          <div className="page-shop-backhome">
            <Link to="/" />
          </div>
          {
            showLoadingMore
              ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
                正在加载
            </div>
              : null
          }
        </div>

      </div>
    );
  }
}


ShopPage.title = '积分商城';

ShopPage.propTypes = {
  bannerAction: PropTypes.func,
  banner: PropTypes.shape({}),
  user: PropTypes.shape({}),
  usercenter: PropTypes.shape({}),
  requestGoodsList: PropTypes.func,
};

export default connect(
  state => ({
    banner: state.shop.banner,
    user: state.user,
    usercenter: state.my.usercenter,
    goods: state.shop.goodsList,
  }),
  dispatch => bindActionCreators({
    bannerAction,
    requestGoodsList,
    userCenterAction
  },
    dispatch),
)(ShopPage);
