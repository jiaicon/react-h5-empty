/**
 * @file 天加成员
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 "jsx-a11y/no-static-element-interactions":"off",
 "react/no-array-index-key":"off" */
import React, {PropTypes} from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from '../../../components/link/link';
import {} from '../../../stores/common';
import classnames from 'classnames';
import Avatar from '../../../components/avatar/avatar';
import {addFamilyAction} from '../my.store';
import history from '../../history';
import './add.css';
import uploadToWX from '../../../utils/wxupload';


import Tab from '../../../components/tab/tab';
import BindFamily from './addTab/bindFamily';
import NewFamily from './addTab/newFamily';

function checkEmpty(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请填写${label}`);
        return true;
    }

    return false;
}
const TAB_URL_MAPS = {
    '/my/family/add': <BindFamily />,
    '/my/family/add/newfamily': <NewFamily />
};
class Addmember extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
            photo: '',
            pages: this.getTabName(props)
        });
    }

    getTabName(props) {
        return TAB_URL_MAPS[(props || this.props).route.path];
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const {
            add: {data: Cdata},
            add: {fetching: Cfetching},
            add: {failed: Cfailed}
        } = this.props;

        const {
            add: {data: Ndata},
            add: {fetching: Nfetching},
            add: {failed: Nfailed}
        } = nextProps;

        if (!Cdata && Ndata && Cfetching && !Nfetching && !Cfailed && !Nfailed) {
            window.location.replace('/my/family');
            // history.replace('/my/family');
        }


        this.setState({
            ...this.state,
            pages: this.getTabName(nextProps),
        });
    }

    componentWillUnmount() {
    }

    // 上传照片
    onAvatarClick() {
        uploadToWX({
            success: (urls) => {
                console.log('图片上传成功:', urls);
                this.setState({
                    ...this.state,
                    photo: urls[0],
                });
                this.photo = urls[0];
            },
        });
    }

    onTextChanged() {
        const name = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
        const password = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');

        this.setState({
            ...this.state,
            name,
            password,
        });
    }

    onSubmit() {
        const name = this.state.name;
        const password = this.state.password;
        const photo = this.state.photo;
        if (checkEmpty(name, '姓名') || checkEmpty(password, '密码')) {
            return;
        }
        if (password.length <= 5 || password.length >= 19) {
            Alert.warning('密码范围6-20位数字字母组成');
            return;
        }
        if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
            Alert.warning('请输入正确的用户名》');
            return;
        }

        const data = {};
        data.username = name;
        data.pwd = password;
        if (photo) {
            data.avatars = photo;
        }
        this.props.addFamilyAction(data);
    }

    render() {
        const {pages} = this.state;
        const {path} = this.props.route;
        return (
            <div className="page-add-family-tab-container">
                <div className="page-add-family-tab-top" style={{ width: '100%', height: '53px' }}>
                    <ul className="page-add-family-tab-ul-container">
                        <li className={classnames({
                    active: path==='/my/family/add'
                })}>
                            <Link to="/my/family/add">
                                <div>绑定家庭成员
                                </div>
                            </Link>
                        </li>
                        <li className={classnames({
                  active: path ==='/my/family/add/newfamily'
                  })}>
                            <Link to="/my/family/add/newfamily">
                                <div>新建家庭成员</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="page-add-family-tab-content">
                    {pages}
                </div>
            </div>
        )
    }
}


Addmember.title = '添加成员';

Addmember.propTypes = {
    addFamilyAction: PropTypes.func,
    add: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        data: PropTypes.shape({
            data: PropTypes.shape({
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
        }),
    }),

};

export default connect(
    state => ({
        add: state.my.addFamily,
    }),
    dispatch => bindActionCreators({
        addFamilyAction,
    }, dispatch),
)(Addmember);
