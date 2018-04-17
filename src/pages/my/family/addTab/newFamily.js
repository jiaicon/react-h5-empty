/**
 * Created by jxt on 2018/4/12.
 */
import React, {PropTypes} from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import history from '../../../history';
import { bindActionCreators } from 'redux';
import { addFamilyPeople } from './../../my.store';

import {addressDataAction} from './../../profile/profile.store';

import './newFamily.css';
const isAndroid = /android/i.test(navigator.userAgent);
const relations = [{name: '兄弟', id: 0},{name: '姐妹',id: 1},{name: '父子',id: 2},{name: '母女',id: 3}];

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
function isChoose(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请选择${label}`);
        return true;
    }

    return false;
}
class NewFamily extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
            province: 0,
            city: 0,
            county: 0,
        });
    }
    componentWillMount() {
        this.props.addressDataAction(0);
    }
    componentDidMount() {
        // Android 下 fastclick 影响 select 点击
        if (window.fastclick && isAndroid) {
            window.fastclick.destroy();
            window.fastclick = null;
        }
    }
    componentWillReceiveProps(nextProps) {
        const { failed: tFailed, fetching: tFetch } = this.props.addPeople;
        const { failed: nFailed, fetching: nFetch } = nextProps.addPeople;
        if(tFetch && !nFetch && !nFailed) {
            history.replace('/my/family');
        }
    }
    handleProvinceClick() {
        this.setState({
            ...this.state,
            province: this.province.value
        });
        this.props.addressDataAction(this.province.value);
    }
    handleCityClick() {
        this.setState({
            ...this.state,
            city: this.city.value,
        });
        this.props.addressDataAction(this.city.value);
    }
    handleCountyClick() {
        this.setState({
            ...this.state,
            county: this.county.value
        });
        this.props.addressDataAction(this.county.value);
    }
    handlePeopleClick() {
        this.setState({
            ...this.state,
            nation: this.people.value,
            relations: this.relations.value
        })
    }
    componentWillUnmount() {
        if (!window.fastclick && isAndroid) {
            window.fastclick = FastClick.attach(document.body);
        }
    }
    onTextChanged() {
        const username = this.username.value.replace(/(^\s+)|(\s+$)/g, '');
        const userpassword = this.userpassword.value.replace(/(^\s+)|(\s+$)/g, '');
        const idNumber = this.idNumber.value.replace(/(^\s+)|(\s+$)/g, '');
        const addressDetail = this.addressDetail.value.replace(/(^\s+)|(\s+$)/g, '');
        this.setState({
            ...this.state,
            username,
            userpassword,
            idNumber,
            addressDetail
        });
    }
    addFamilyPeople() {
        const username = this.state.username;
        const userpassword = this.state.userpassword;
        const idNumber = this.state.idNumber;
        const nation = this.state.nation;
        const relations = this.state.relations;
        const province = this.state.province;
        const city = this.state.city;
        const county = this.state.county;
        const addressDetail = this.state.addressDetail;
        if (checkEmpty(username, '姓名') || checkEmpty(userpassword, '密码')
            || checkEmpty(idNumber, '身份证号') || checkEmpty(addressDetail, '详细地址')) {
            return;
        }
        if(isChoose(province, '省份')|| isChoose(relations, '关系') || isChoose(nation, '民族')
            || isChoose(city, '城市') || isChoose(county, '区县')) {
            return
        }
        if (userpassword.length <= 5 || userpassword.length >= 19) {
            Alert.warning('密码范围6-20位数字字母组成');
            return;
        }
        if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
            Alert.warning('请输入正确的用户名》');
            return;
        }

        const data = {};
        data.real_name = username;
        data.pwd = userpassword;
        data.id_number = idNumber;
        data.nation = nation;
        data.relation = relations;
        data.province_id = province;
        data.city_id = city;
        data.county_id = county;
        data.addr = addressDetail;
        this.props.addFamilyPeople(data);
    }
    render() {
        const province = this.props.address.data.province;
        const city = this.props.address.data.city;
        const county = this.props.address.data.county;
        return(
            <div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">姓名</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text"  ref={(c) => { this.username = c; }} onKeyUp={this.onTextChanged} />
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">身份证号</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text" ref={(c)=>{this.idNumber = c}} onKeyUp={this.onTextChanged}/>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">民族</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="people">
                            <select id="people" onChange={this.handlePeopleClick} ref={(c) => { this.people = c; }}>
                                <option value="-1" />
                                { people && people.map((item, keys) =>
                                    <option value={item.name} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="pages-add-new-family-address">现居住地址</div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">省份</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="province">
                            <select id="province" onChange={this.handleProvinceClick} ref={(c) => { this.province = c; }}>
                                <option value="-1" />
                                { province && province.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">城市</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="city">
                            <select id="city" onChange={this.handleCityClick} ref={(c) => { this.city = c; }}>
                                <option value="-1" />
                                { city && city.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">区县</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="people">
                            <select id="people" onChange={this.handleCountyClick} ref={(c) => { this.county = c; }}>
                                <option value="-1" />
                                { county && county.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">详细地址</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text" ref={(c)=>{this.addressDetail = c}} onKeyUp={this.onTextChanged}/>
                    </div>
                </div>
                <div className="pages-add-new-family-space"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">密码</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="password" ref={(c)=>{this.userpassword = c}} onKeyUp={this.onTextChanged}/>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">关系</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="relations">
                            <select id="relations" onChange={this.handlePeopleClick} ref={(c) => { this.relations = c; }}>
                                <option value="-1" />
                                { relations && relations.map((item, keys) =>
                                    <option value={item.name} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="pages-add-new-family-btn" onClick={this.addFamilyPeople}>确认</div>
                <div className="pages-add-new-family-tips">说明：添加的成员，可以用身份证号和密码登录</div>
            </div>
        )
    }
}
NewFamily.title= '新建家庭成员';
NewFamily.PropTypes = {
    addressDataAction: PropTypes.func,
    addFamilyPeople: PropTypes.func,
    addPeople: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
        data: PropTypes.shape({
            username: PropTypes.string,
            id: PropTypes.number,
            real_name: PropTypes.string,
            nation: PropTypes.string,
            id_number: PropTypes.string,
            province_id: PropTypes.number,
            province_name: PropTypes.string,
            city_id: PropTypes.number,
            city_name: PropTypes.string,
            county_id: PropTypes.number,
            county_name: PropTypes.string,
            addr: PropTypes.string,
            relation: PropTypes.string,
            token: PropTypes.string
        })
    })
};

export default connect(
    state => ({
        address: state.info.address,
        addPeople: state.my.addPeople
    }),
    dispatch => bindActionCreators({
        addressDataAction,addFamilyPeople
    }, dispatch),
)(NewFamily);
