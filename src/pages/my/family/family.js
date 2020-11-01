/**
 * @file 我的家庭
 */

/* global wx:false */
import React, {PropTypes} from 'react';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import autoBind from 'react-autobind';
import { requestUserInfo } from '../../../stores/common';
import Link from '../../../components/link/link';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FamilyItem from './component/familyItem';
import {familyAction, deleteFamilyAction} from '../my.store';
import './family.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Family extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount() {
        this.props.familyAction();
        this.props.requestUserInfo();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const {deletefamily: Cdeletefamily} = this.props;
        const {deletefamily: Ndeletefamily} = nextProps;
        if (Cdeletefamily.fetching && !Ndeletefamily.fetching && !Ndeletefamily.failed) {
            this.props.familyAction();
        }
    }

    componentWillUnmount() {
    }

    onSwipePress(data) {
        const id = data.id;
        this.props.deleteFamilyAction(id);
    }

    familyMember(data) {
      const { t } = this.props;
      return (
          <Swipeout
              right={[
        {
          text: t('删除'),
          onPress: () => this.onSwipePress(data),
          style: { backgroundColor: '#FBABAB', color: '#333333', fontSize: `${15}px` },
          className: 'custom-class-2'
        },
      ]}

          >
              <Link to={`/my/profile/detail/${data.id}`}>
                  <FamilyItem data={data} key={data.id}/>
              </Link>
          </Swipeout>
      );
    }
    defaultFamilyMember(data, keys) {
        return (
            <FamilyItem data={data} key={data.id}/>
        )
    }
    render() {
        const {family: {data: listData}, t} = this.props;
        const isHouseholder = this.props.user.relation;
        if (listData == null) {
            return <div>{t('加载中')}</div>;
        }
        return (
            <div className="page-family">
                <div className="pages-family-top-area-container">
                    <div className="pages-family-top-area-title-and-btn">
                        <h5>{t('我的家庭')}</h5>
                        {
                            isHouseholder === '户主' || isHouseholder === ''?
                                <Link to="/my/family/add">
                                    <div className="pages-family-top-area-btn">{t('添加成员')}</div>
                                </Link>
                                : null
                        }

                    </div>
                    <div className="page-family-top-area-view">
                        <div className="page-family-top-area-view-family-box">
                            <p><span>{listData ? listData.data.family_size : 0}</span>人</p>
                            <p>{t('家庭成员')}</p>
                        </div>
                        <div className="page-family-top-area-view-line"/>
                        <div className="page-family-top-area-view-family-box">
                            <p><span>{listData ? listData.data.reward_time : 0}</span>{t('小时')}</p>
                            <p>{t('志愿总时长')}</p>
                        </div>
                    </div>
                </div>
                <div className="page-family-take-up"/>
                <div className="page-family-member-list">

                    { listData && listData.data && listData.data.family ?
                        (
                            //增加判断是不是户主
                            isHouseholder === '户主' || isHouseholder === ''?
                                listData.data.family.map((item) => this.familyMember(item))
                                :
                                listData.data.family.map((item) => this.defaultFamilyMember(item))
                        )
                        : <div />
                    }
                </div>


            </div>
        );
    }
}


Family.title = i18next.t('我的家庭');

Family.propTypes = {
    familyAction: PropTypes.func,
    deleteFamilyAction: PropTypes.func,
    requestUserInfo: PropTypes.func,
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
        good_at: PropTypes.arrayOf(PropTypes.shape({})),
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
                    good_at: PropTypes.arrayOf(PropTypes.shape({}))
                })
            )
        })
    }),
    deletefamily: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
    }),
    user: PropTypes.shape({
        addr: PropTypes.string,
        avatars: PropTypes.string,
        birthday: PropTypes.string,
        province_id: PropTypes.number,
        province_name: PropTypes.string,
        city_id: PropTypes.number,
        city_name: PropTypes.string,
        county_id: PropTypes.number,
        county_name: PropTypes.string,
        token: PropTypes.string,
        good_at: PropTypes.arrayOf(PropTypes.shape({})),
        family_id: PropTypes.number,
        id: PropTypes.number,
        id_number: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        identifier: PropTypes.string,
        join_family_time: PropTypes.string,
        nation: PropTypes.string,
        phone: PropTypes.string,
        real_name: PropTypes.string,
        reward_time: PropTypes.string,
        sex: PropTypes.number,
        slogan: PropTypes.string,
        username: PropTypes.string,
    })
};

export default connect(
    state => ({
        family: state.my.family,
        deletefamily: state.my.deletefamily,
        user: state.user
    }),
    dispatch => bindActionCreators({
        familyAction,
        deleteFamilyAction,
        requestUserInfo
    }, dispatch),
)(translate('translations')(Family));
