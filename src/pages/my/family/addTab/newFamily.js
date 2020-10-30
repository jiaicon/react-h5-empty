/**
 * Created by jxt on 2018/4/12.
 */
import React, { PropTypes } from 'react';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFamilyPeople } from './../../my.store';
import FastClick from 'fastclick';
import { addressDataAction } from './../../profile/profile.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import './newFamily.css';

const isAndroid = /android/i.test(navigator.userAgent);
const relations = [{ name: i18next.t('儿子'), id: 0 }, { name: i18next.t('女儿'), id: 1 }, { name: i18next.t('丈夫'), id: 2 }, { name: i18next.t('妻子'), id: 3 }
    , { name: i18next.t('母亲'), id: 4 }, { name: i18next.t('父亲'), id: 5 }, { name: i18next.t('爷爷'), id: 6 }, { name: i18next.t('奶奶'), id: 7 }, { name: i18next.t('其他'), id: 8 }];

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
const cardtype = [
    { id: "1", name: i18next.t('内地居民身份证') },
    { id: "2", name: i18next.t('香港居民身份证') },
    { id: "3", name: i18next.t('澳门居民身份证') },
    { id: "4", name: i18next.t('台湾居民身份证') },
    { id: "5", name: i18next.t('护照') }
];

function checkEmpty(value, label) {
    if (!value || !value.length) {
        Alert.warning(`${i18next.t('请填写')}${label}`);
        return true;
    }

    return false;
}
function isChoose(value, label) {
    if (!value || !value.length) {
        Alert.warning(`${i18next.t('请选择')}${label}`);
        return true;
    }

    return false;
}
function checkStr(str) {
    const reg = new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$');
    if (!reg.test(str)) {
        Alert.warning(i18next.t('请输入中文姓名'));
        return true;
    }
    return false;
}
function iscard(card) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(card)) {
        Alert.warning(i18next.t('身份证输入不合法'));
        return true;
    }
    return false;
}
function isaomencard(card) {
    const reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;
    if (!reg.test(card)) {
        Alert.warning(i18next.t('身份证输入不合法'));
        return true;
    }
    return false;
}
function isxiangancard(card) {
    const reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/;
    if (!reg.test(card)) {
        Alert.warning(i18next.t('身份证输入不合法'));
        return true;
    }
    return false;
}
function istaiwancard(card) {
    const reg = /^[a-zA-Z][0-9]{9}$/;
    if (!reg.test(card)) {
        Alert.warning(i18next.t('身份证输入不合法'));
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
            cardtype: 1,
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
        if (tFetch && !nFetch && !nFailed) {
            window.location.replace('/my/family');
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
        window.orgInfo.area_level === 4 && this.props.addressDataAction(this.county.value);
    }

    handleTownshipClick() {
        this.setState({
            ...this.state,
            township: this.township.value
        });
    }
    
    handlePeopleClick() {
        this.setState({
            ...this.state,
            nation: this.people.value,
            relations: this.relations.value
        })
    }
    handleCardClick() {
        this.setState({ ...this.state, cardtype: this.cardtype.value });
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
      const { t } = this.props;
        const username = this.state.username;
        const userpassword = this.state.userpassword;
        const idNumber = this.state.idNumber;
        const nation = this.state.nation;
        const relations = this.state.relations;
        const province = this.state.province;
        const city = this.state.city;
        const county = this.state.county;
        const { township } = this.state;
        const addressDetail = this.state.addressDetail;
        const cardtype = this.state.cardtype;
        if (checkEmpty(username, t('姓名')) || checkEmpty(userpassword, t('密码'))
            || checkEmpty(idNumber, t('身份证号')) || checkEmpty(addressDetail, t('详细地址'))
            || checkStr(username, t('姓名'))) {
            return;
        }
        if (idNumber) {
            if (cardtype == 1 && iscard(idNumber)) {
                return;
            } else if (cardtype == 2 && isxiangancard(idNumber)) {
                return;
            } else if (cardtype == 3 && isaomencard(idNumber)) {
                return;
            } else if (cardtype == 4 && istaiwancard(idNumber)) {
                return;
            }
        }
        if (isChoose(nation, t('民族')) || isChoose(province, t('省份')) || isChoose(city, t('城市')) || isChoose(county, t('区县')) || (window.orgInfo.area_level === 4 && isChoose(township, t('街道'))) || isChoose(relations, t('关系'))) {
            return
        }
        if (userpassword.length <= 5 || userpassword.length >= 19) {
            Alert.warning(t('密码范围6-20位数字字母组成'));
            return;
        }
        if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
            Alert.warning(t('请输入正确的用户名'));
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
        if (window.orgInfo.area_level === 4) {
            data.township_id = township;
        }
        data.addr = addressDetail;
        data.num_type = cardtype;
        this.props.addFamilyPeople(data);
    }
    render() {
        const province = this.props.address.data.province;
        const city = this.props.address.data.city;
        const county = this.props.address.data.county;
        const township = this.props.address.data.township;
        const { t } = this.props;

        return (
            <div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('姓名')}</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text" ref={(c) => { this.username = c; }} onBlur={this.onTextChanged} />
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('证件类型')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="cardtype">
                            <select
                                id="cardtype"
                                onChange={this.handleCardClick}
                                ref={c => {
                                    this.cardtype = c;
                                }}
                            >
                                {cardtype &&
                                    cardtype.map((item, keys) => (
                                        <option value={item.id} key={keys}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('证件号码')}</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text" ref={(c) => { this.idNumber = c }} onKeyUp={this.onTextChanged} />
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('民族')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="people">
                            <select id="people" onChange={this.handlePeopleClick} ref={(c) => { this.people = c; }}>
                                <option value="-1" />
                                {people && people.map((item, keys) =>
                                    <option value={item.name} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="pages-add-new-family-address">{t('现居住地址')}</div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('省份')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="province">
                            <select id="province" onChange={this.handleProvinceClick} ref={(c) => { this.province = c; }}>
                                <option value="-1" />
                                {province && province.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('城市')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="city">
                            <select id="city" onChange={this.handleCityClick} ref={(c) => { this.city = c; }}>
                                <option value="-1" />
                                {city && city.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('区县')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="county">
                            <select id="county" onChange={this.handleCountyClick} ref={(c) => { this.county = c; }}>
                                <option value="-1" />
                                {county && county.map((item, keys) =>
                                    <option value={item.id} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                {
                    window.orgInfo.area_level === 4 && <div className="line1px" />
                }
                {
                    window.orgInfo.area_level === 4 && <div className="pages-add-new-family-box">
                        <div className="pages-add-new-family-type">{t('街道')}</div>
                        <div className="pages-add-new-family-ipt">
                            <label htmlFor="township">
                                <select id="county" onChange={this.handleTownshipClick} ref={(c) => { this.township = c; }}>
                                    <option value="-1" />
                                    {township && township.map((item, keys) =>
                                        <option value={item.id} key={keys}>{item.name}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                }
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('详细地址')}</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="text" ref={(c) => { this.addressDetail = c }} onKeyUp={this.onTextChanged} />
                    </div>
                </div>
                <div className="pages-add-new-family-space"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('密码')}</div>
                    <div className="pages-add-new-family-ipt">
                        <input type="password" ref={(c) => { this.userpassword = c }} onKeyUp={this.onTextChanged} />
                    </div>
                </div>
                <div className="line1px"></div>
                <div className="pages-add-new-family-box">
                    <div className="pages-add-new-family-type">{t('关系')}</div>
                    <div className="pages-add-new-family-ipt">
                        <label htmlFor="relations">
                            <select id="relations" onChange={this.handlePeopleClick} ref={(c) => { this.relations = c; }}>
                                <option value="-1" />
                                {relations && relations.map((item, keys) =>
                                    <option value={item.name} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="pages-add-new-family-btn" onClick={this.addFamilyPeople}>{t('确认')}</div>
                <div className="pages-add-new-family-tips">{t('添加成员说明')}</div>
            </div>
        )
    }
}
NewFamily.title = i18next.t('新建家庭成员');
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
        addressDataAction, addFamilyPeople
    }, dispatch),
)(translate('translations')(NewFamily));
