/**
 * @file 我的家庭
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import autoBind from 'react-autobind';
import Link from '../../../components/link/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserInfo } from '../../../stores/common';
import FamilyItem from './component/familyItem';
import { familyAction } from '../my.store';
import './family.css';

class Family extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.familyAction();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const user = this.props.user;
    const family = this.props.family;
    if (!family && !family.data) {
      return <div />;
    }
    return (
      <div className="page-family">
        <div className="pages-family-top-area-container">
          <div className="pages-family-top-area-title-and-btn">
            <h5>我的家庭</h5>
            <Link to="/my/family/add">
              <div className="pages-family-top-area-btn">添加成员</div>
            </Link>
          </div>
          <div className="page-family-top-area-view">
            <div className="page-family-top-area-view-family-box">
              <p><span>{family.data ? family.data.data.family_size + 1 : 0}</span>人</p>
              <p>家庭成员</p>
            </div>
            <div className="page-family-top-area-view-line" />
            <div className="page-family-top-area-view-family-box">
              <p><span>{family.data ? family.data.data.reward_time : 0}</span>小时</p>
              <p>志愿总时长</p>
            </div>
          </div>
        </div>
        <div className="page-family-take-up" />
        <div>
          <FamilyItem data={user} />


        </div>


      </div>
    );
  }
}
 // <Swipeout
          //   right={[
          //     {
          //       text: '删除',
          //       onPress: () => console.log('delete'),
          //       style: { backgroundColor: '#FBABAB', color: '#333333', fontSize: `${15}px` },
          //       className: 'custom-class-2',
          //     },
          //   ]}
          //   onOpen={() => console.log('open')}
          //   onClose={() => console.log('close')}
          // >
          //   <FamilyItem data={user} />
          // </Swipeout>

Family.title = '我的家庭';

Family.propTypes = {
  familyAction: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    id_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({

    })),
  }),
  family: PropTypes.shape({
    data: PropTypes.shape({
      family_size: PropTypes.number,
      reward_time: PropTypes.number,
      family: PropTypes.arrayOf(
        PropTypes.shape({
          token: PropTypes.string,
          id: PropTypes.number,
          username: PropTypes.string,
          phone: PropTypes.string,
          avatars: PropTypes.string,
          real_name: PropTypes.string,
          nation: PropTypes.string,
          sex: PropTypes.number,
          birthday: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          identifier: PropTypes.string,
          slogan: PropTypes.string,
          reward_time: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          id_number: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          province_id: PropTypes.number,
          province_name: PropTypes.string,
          city_id: PropTypes.number,
          city_name: PropTypes.string,
          county_id: PropTypes.number,
          county_name: PropTypes.string,
          addr: PropTypes.string,
          family_id: PropTypes.number,
          join_family_time: PropTypes.string,
          good_at: PropTypes.arrayOf(PropTypes.shape({

          })),
        }),
      ),
    }),
  }),
};

export default connect(
  state => ({
    user: state.user,
    family: state.my.family,
  }),
  dispatch => bindActionCreators({
    requestUserInfo,
    familyAction,
  }, dispatch),
)(Family);
