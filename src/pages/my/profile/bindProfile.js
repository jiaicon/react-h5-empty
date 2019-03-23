/**
 * @file 手机号绑定/邮箱
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePhone, imporvePersonInfo } from './profile.store';
import { requestVerifyCode } from '../register/register.store';
import './bindProfile.css';
import { List, Radio } from 'antd-mobile';
import 'antd-mobile/lib/Radio/style/css';
import 'antd-mobile/lib/list/style/css';
import { getQueryString } from './../../../utils/funcs';
const RadioItem = Radio.RadioItem;

const people = [{ id: '01', name: '汉族' }, { id: '02', name: '蒙古族' }, { id: '03', name: '回族' },
    { id: '04', name: '藏族' }, { id: '05', name: '维吾尔族' }, { id: '06', name: '苗族' },
    { id: '07', name: '彝族' }, { id: '08', name: '壮族' }, { id: '09', name: '布依族' },
    { id: '10', name: '朝鲜族' }, { id: '11', name: '满族' }, { id: '12', name: '侗族' },
    { id: '13', name: '瑶族' }, { id: '14', name: '白族' }, { id: '15', name: '土家族' },
    { id: '16', name: '哈尼族' }, { id: '17', name: '哈萨克族' }, { id: '18', name: '傣族' },
    { id: '19', name: '黎族' }, { id: '20', name: '傈僳族' }, { id: '21', name: '佤族' },
    { id: '22', name: '畲族' }, { id: '23', name: '高山族' }, { id: '24', name: '拉祜族' },
    { id: '25', name: '水族' }, { id: '26', name: '东乡族' }, { id: '27', name: '纳西族' },
    { id: '28', name: '景颇族' }, { id: '29', name: '柯尔克孜族' }, { id: '30', name: '土族' },
    { id: '31', name: '达斡尔族' }, { id: '32', name: '仫佬族' }, { id: '33', name: '羌族' },
    { id: '34', name: '布朗族' }, { id: '35', name: '撒拉族' }, { id: '36', name: '毛难族' },
    { id: '37', name: '仡佬族' }, { id: '38', name: '锡伯族' }, { id: '39', name: '阿昌族' },
    { id: '40', name: '普米族' }, { id: '41', name: '塔吉克族' }, { id: '42', name: '怒族' },
    { id: '43', name: '乌孜别克族' }, { id: '44', name: '俄罗斯族' }, { id: '45', name: '鄂温克族' },
    { id: '46', name: '崩龙族' }, { id: '47', name: '保安族' }, { id: '48', name: '裕固族' },
    { id: '49', name: '京族' }, { id: '50', name: '塔塔尔族' }, { id: '51', name: '独龙族' },
    { id: '52', name: '鄂伦春族' }, { id: '53', name: '赫哲族' }, { id: '54', name: '门巴族' },
    { id: '55', name: '珞巴族' }, { id: '56', name: '基诺族' }];
function checkEmpty(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请填写${label}`);
        return true;
    }

    return false;
}
class BindInfo extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.type = this.props.route.params.type;
        this.state = ({

        });
    }


    componentWillMount() {

    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { code: cCode, phone: Lphone, person: Lperson } = this.props;
        const { code: nCode, phone: Nphone, person: Nperson } = nextProps;

        if (this.type === 'sex') {
            if (Lperson.fetching && !Nperson.fetching && !Nperson.failed) {
                window.location.replace('/my/profile/detail/user');
                // history.replace('/my/profile/detail/user');
            }
        } else if (this.type === 'nation') {
            if (Lperson.fetching && !Nperson.fetching && !Nperson.failed) {
                // window.location.replace('/my/profile/detail/user');
                // history.replace('/my/profile/detail/user');
            }
        }
    }
    componentWillUnmount() {

    }

    onSexClick =(value)=> {
        this.sex=value;
        this.setState({
            sex: value
        })
    };
    onSexSubmit() {
        const data = {};
        data.sex = this.sex;
        this.props.imporvePersonInfo(data);
    }
    bindSexview() {
        const data = [{label: '男', toggle: false, value: 1}, {label: '女', toggle: false, value: 2}];
        return(
            <div className="page-profile-checkbox-container">
                {
                    <List>
                        {
                            data.map((item, index)=>(
                                <RadioItem key={item.value} checked={this.sex === item.value} onChange={() => this.onSexClick(item.value)}>
                                    {item.label}
                                </RadioItem>
                            ))
                        }
                    </List>
                }
                <div className="page-profile-bind-info-container-submmit" onClick={this.onSexSubmit}>确认提交</div>
            </div>
        )
    }
    onNationSubmit() {
        console.log(this.state.nation);
        if(!this.state.nation || this.state.nation==undefined) {
            Alert.error('请先选择民族');
            return;
        }
        this.props.imporvePersonInfo({
            nation: this.state.nation
        });
    }
    handlePeopleClick() {
        this.setState({
            ...this.state,
            nation: this.people.value,
        })
    }
    bindNationview() {
        return(
            <div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">民族</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="people">
                            <select id="people" defaultValue={decodeURI(getQueryString('nation'))} onChange={this.handlePeopleClick} ref={(c) => { this.people = c; }}>
                                {
                                    decodeURI(getQueryString('nation')).length ? null : <option value="-1">请选择民族</option>
                                }
                                { people && people.map((item, keys) =><option value={item.name} key={keys}>{item.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="page-profile-bind-info-container-submmit" onClick={this.onNationSubmit}>确认提交</div>
            </div>
        )
    }
    chooseType() {
        // {this.type === 'phone' ? this.bindPhoneview() : this.bindMailview()}
        if(this.type === 'sex') {
            return this.bindSexview()
        }else if(this.type === 'nation') {
            return this.bindNationview()
        }
    }
    render() {
        // const data = this.state.data;
        return (
            <div className="page-profile-bind-container">
                {this.chooseType()}
            </div>
        );
    }
}


BindInfo.title = '个人信息绑定';
BindInfo.propTypes = {
    imporvePersonInfo: PropTypes.func,
    updatePhone: PropTypes.func,
    requestVerifyCode: PropTypes.func,
    phone: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        data: PropTypes.shape({
        }),
    }),
    code: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        data: PropTypes.shape({
        }),
    }),
    mail: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        data: PropTypes.shape({
        }),
    }),
};

export default connect(
    state => ({
        phone: state.info.updatePhone,
        code: state.register.code,
        person: state.info.person,
    }),
    dispatch => bindActionCreators({ updatePhone, requestVerifyCode, imporvePersonInfo }, dispatch),
)(BindInfo);
