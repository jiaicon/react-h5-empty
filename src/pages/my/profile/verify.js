/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, {PropTypes} from 'react';
import FastClick from 'fastclick';
import Alert from 'react-s-alert';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import uploadToWX from '../../../utils/wxupload';
import history from '../../history';
import {requestUserInfo} from '../../../stores/common';
import Avatar from '../../../components/avatar/avatar';
import {checkUser, addressDataAction, userDefinedInfo} from './profile.store';


import './verify.css';
import {List, Checkbox, DatePicker, Flex} from 'antd-mobile';


import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import './verifyAntd.css';
const isAndroid = /android/i.test(navigator.userAgent);
const people = [{id: '01', name: '汉族'}, {id: '02', name: '蒙古族'}, {id: '03', name: '回族'},
    {id: '04', name: '藏族'}, {id: '05', name: '维吾尔族'}, {id: '06', name: '苗族'},
    {id: '07', name: '彝族'}, {id: '08', name: '壮族'}, {id: '09', name: '布依族'},
    {id: '10', name: '朝鲜族'}, {id: '11', name: '满族'}, {id: '12', name: '侗族'},
    {id: '13', name: '瑶族'}, {id: '14', name: '白族'}, {id: '15', name: '土家族'},
    {id: '16', name: '哈尼族'}, {id: '17', name: '哈萨克族'}, {id: '18', name: '傣族'},
    {id: '19', name: '黎族'}, {id: '20', name: '傈僳族'}, {id: '21', name: '佤族'},
    {id: '22', name: '畲族'}, {id: '23', name: '高山族'}, {id: '24', name: '拉祜族'},
    {id: '25', name: '水族'}, {id: '26', name: '东乡族'}, {id: '27', name: '纳西族'},
    {id: '28', name: '景颇族'}, {id: '29', name: '柯尔克孜族'}, {id: '30', name: '土族'},
    {id: '31', name: '达斡尔族'}, {id: '32', name: '仫佬族'}, {id: '33', name: '羌族'},
    {id: '34', name: '布朗族'}, {id: '35', name: '撒拉族'}, {id: '36', name: '毛难族'},
    {id: '37', name: '仡佬族'}, {id: '38', name: '锡伯族'}, {id: '39', name: '阿昌族'},
    {id: '40', name: '普米族'}, {id: '41', name: '塔吉克族'}, {id: '42', name: '怒族'},
    {id: '43', name: '乌孜别克族'}, {id: '44', name: '俄罗斯族'}, {id: '45', name: '鄂温克族'},
    {id: '46', name: '崩龙族'}, {id: '47', name: '保安族'}, {id: '48', name: '裕固族'},
    {id: '49', name: '京族'}, {id: '50', name: '塔塔尔族'}, {id: '51', name: '独龙族'},
    {id: '52', name: '鄂伦春族'}, {id: '53', name: '赫哲族'}, {id: '54', name: '门巴族'},
    {id: '55', name: '珞巴族'}, {id: '56', name: '基诺族'}];

let isEmpty = false;

function checkEmpty(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请填写${label}`);
        isEmpty = true;
        return true;
    } else {
        isEmpty = false;
    }
    return false;
}

function isRequired(arr, stateData) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].is_required && arr[i].is_required === 1) {
            if (stateData.length != 0) {
                let isInArr = false;
                for(let j = 0; j < stateData.length;j++) {
                    if (arr[i].key in stateData[j]) {
                        isInArr = false;
                        // checkEmpty(item1[arr[i].key], arr[i].key);
                        break;
                    } else {
                        isInArr = true;
                    }
                }
                if (isInArr) {
                    checkEmpty(null, arr[i].key);
                    return true;
                }
            } else {
                Alert.warning(`请填写${arr[i].key}`);
                isEmpty = true;
                break;
            }
        }
    }
    if (isEmpty) {
        return true;
    }
    return false;
}

function checkStr(str) {
    const reg = new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$');
    if (!reg.test(str)) {
        Alert.warning('请输入中文姓名');
        return true;
    }
    return false;
}

function iscard(card) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(card)) {
        Alert.warning('身份证输入不合法');
        return true;
    }
    return false;
}

function formatDate(x, y) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const date = new Date(x);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (y) {
        return `${dateStr} ${timeStr}`;
    } else {
        return `${dateStr}`;
    }
}

class Verify extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
            province: 0,
            city: 0,
            county: 0,
            extendsArray: [],
            winOrgInfo: window.orgInfo.custom_config
        });
        this.CustomChildren = ({extra, onClick}) => (

            <div
                onClick={onClick}
                style={{height: '40px', lineHeight: '40px', color: '#565656'}}
            >
            <span
                className="page-my-profile-verify-text page-my-profile-verify-text-lineheight"
            >
              {extra}</span>

            </div>
        );
    }

    componentWillMount() {
        this.props.addressDataAction(0);
        const params = this.props.route.params;
        this.initialPic(this.state.winOrgInfo.extends);
        if (params.projectId && !isNaN(Number(params.projectId))) {
            const projectId = params.projectId;
            this.setState({
                ...this.state,
                projectId,
            });
        }
        if (params.teamId && !isNaN(Number(params.teamId))) {
            const teamId = params.teamId;
            this.setState({
                ...this.state,
                teamId,
            });
        }
    }

    componentDidMount() {
        // Android 下 fastclick 影响 select 点击
        if (window.fastclick && isAndroid) {
            window.fastclick.destroy();
            window.fastclick = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        const {check: Ccheck} = this.props;
        const {check: Ncheck} = nextProps;
        if (Ccheck.fetching && !Ncheck.fetching && !Ncheck.failed) {
            this.props.requestUserInfo();

            // TODO 如果从项目跳过来的需要跳回去
            if (this.state.projectId) {
                history.replace(`/project/detail/${this.state.projectId}`);
            } else if (this.state.teamId) {
                history.replace(`/team/detail/${this.state.projectId}`);
            } else {
                history.replace('/my/profile/detail/user');
            }
        }
    }

    componentWillUnmount() {
        if (!window.fastclick && isAndroid) {
            window.fastclick = FastClick.attach(document.body);
        }
    }

    // 初始化上传照片
    initialPic(data) {
        data.map((item, index) => {
            if (item.type == 5) {
                this.state[item.key] = [];
            }
        })

    }

    onTextChanged() {
        const realname = this.realname.value.replace(/(^\s+)|(\s+$)/g, '');
        const idcard = this.idcard.value.replace(/(^\s+)|(\s+$)/g, '');
        const address = this.address.value.replace(/(^\s+)|(\s+$)/g, '');
        this.setState({
            address,
            realname,
            idcard,
        });
    }

    // 上传照片
    onAvatarClick() {
        uploadToWX({
            success: (urls) => {
                this.setState({
                    ...this.state,
                    photo: urls[0],
                });
                this.photo = urls[0];
            },
        });
    }

    onSubmit() {
        let photo;
        const stateOrgData = this.state.winOrgInfo;
        if (!this.realRegister) {   //非实名
            photo = this.state.photo;
        }
        const realname = this.state.realname;
        const idcard = this.state.idcard;
        const people = this.state.people;

        // const nowaddress = this.state.nowaddress;


        const address = this.state.address;
        const province = this.state.province;
        const city = this.state.city;
        const county = this.state.county;
        if (
            (stateOrgData.open_real_name && checkEmpty(realname, '姓名'))
            || (stateOrgData.open_id_number && checkEmpty(idcard, '身份证号码'))
            || (stateOrgData.open_nation && checkEmpty(people, '民族'))
            || (stateOrgData.open_addr && checkEmpty(province, '省份'))
            || (stateOrgData.open_addr && checkEmpty(city, '城市'))
            || (stateOrgData.open_addr && checkEmpty(county, '区县'))
            || (stateOrgData.open_addr && checkEmpty(address, '详细地址'))
            || (stateOrgData.open_real_name && checkStr(realname))
            || (stateOrgData.open_id_number && iscard(idcard))
        ) {
            return;
        }
        if (isRequired(this.state.winOrgInfo.extends, this.state.extendsArray)) {
            return;
        }
        let data = {};
        if(realname) {
            data.real_name = realname;
        }
        if(idcard) {
            data.id_number = idcard;
        }
        if(people) {
            data.nation = people;
        }
        if(province) {
            data.province_id = province_id;
        }
        if(city) {
            data.city_id = city;
        }
        if(county) {
            data.county_id = county;
        }
        if(address) {
            data.addr = address;
        }
        // const data = {
        //     real_name: realname,
        //     id_number: idcard,
        //     nation: people,
        //     province_id: province,
        //     city_id: city,
        //     county_id: county,
        //     addr: address,
        // };
        if (photo != undefined && photo != '') {
            console.log('photo: ' + photo);
            data.avatars = photo;
        }
        data.extends = this.state.extendsArray;
        console.log('data' + data);
        this.props.checkUser(data);
    }

    handlePeopleClick() {
        this.setState({
            ...this.state,
            people: this.people.value,
        });
    }

    handleProvinceClick() {
        this.setState({
            ...this.state,
            province: this.province.value,
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

    handleCountryClick() {
        this.setState({
            ...this.state,
            county: this.county.value,
        });
    }

    renderAvatars() {
        return (
            <div>
                {
                    this.state.winOrgInfo.open_avatars === 1 ?
                        <div>
                            <div className="page-my-profile-verify-header-box page-my-profile-verify-photo-box">
                                <div className="page-my-profile-verify-fonts">头像</div>
                                <div className="page-my-profile-verify-photo" onClick={this.onAvatarClick}>
                                    <div>
                                        <Avatar src={this.state.photo} size={{width: 40, radius: 4}}
                                                defaultSrc="/images/my/register.png"/>
                                    </div>
                                    <div>
                                        <i className=""></i>
                                    </div>
                                </div>
                            </div>
                            < div className="line1px"/>
                        </div>
                        : null
                }
            </div>
        )
    }

    renderName() {
        return (
            <div>
                {
                    this.state.winOrgInfo.open_real_name === 1 ?
                        <div>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">姓名</div>
                                <input type="text" ref={(c) => {
                                    this.realname = c;
                                }} className="page-my-profile-verify-text" onChange={this.onTextChanged}/>
                            </div>
                            <div className="line1px"/>
                        </div>
                        : null
                }
            </div>
        )
    }

    renderIdCard() {
        return (
            <div>
                {
                    this.state.winOrgInfo.open_id_number === 1 ?
                        <div>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">身份证号</div>
                                <input type="text" maxLength="18" ref={(c) => {
                                    this.idcard = c;
                                }} className="page-my-profile-verify-text" onChange={this.onTextChanged}/>
                            </div>
                            <div className="line1px"/>
                        </div>
                        : null
                }
            </div>
        )
    }

    renderNation() {
        return (
            <div>
                {
                    this.state.winOrgInfo.open_nation === 1 ?
                        <div>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">民族</div>
                                <label htmlFor="people">
                                    <select id="people" onChange={this.handlePeopleClick} ref={(c) => {
                                        this.people = c;
                                    }}>
                                        <option value="-1"/>
                                        {people && people.map((item, keys) =>
                                            <option value={item.name} key={keys}>{item.name}</option>)}
                                    </select>
                                </label>
                            </div>
                            <div className="line1px"/>
                        </div>
                        : null
                }
            </div>
        )
    }

    renderAddr() {
        const province = this.props.address.data.province;
        const city = this.props.address.data.city;
        const county = this.props.address.data.county;
        return (
            <div>
                {
                    this.state.winOrgInfo.open_addr === 1 ?
                        <div>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">省份</div>
                                <label htmlFor="province">
                                    <select id="province" onChange={this.handleProvinceClick} ref={(c) => {
                                        this.province = c;
                                    }}>
                                        <option value="-1"/>
                                        {province && province.map((item, keys) =>
                                            <option value={item.id} key={keys}>{item.name}</option>)}
                                    </select>
                                </label>
                            </div>
                            <div className="line1px"/>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">城市</div>
                                <label htmlFor="city">
                                    <select id="city" onChange={this.handleCityClick} ref={(c) => {
                                        this.city = c;
                                    }}>
                                        <option value="-1"/>
                                        {city && city.map((item, keys) =>
                                            <option value={item.id} key={keys}>{item.name}</option>,
                                        )}
                                    </select>
                                </label>
                            </div>
                            <div className="line1px"/>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">区县</div>
                                <label htmlFor="county">
                                    <select id="county" onChange={this.handleCountryClick} ref={(c) => {
                                        this.county = c;
                                    }}>
                                        <option value="-1"/>
                                        {county && county.map((item, keys) =>
                                            <option value={item.id} key={keys}>{item.name}</option>,
                                        )}
                                    </select>
                                </label>
                            </div>
                            <div className="line1px"/>
                            <div className="page-my-profile-verify-header-box">
                                <div className="page-my-profile-verify-fonts">详细地址</div>
                                <input type="text" ref={(c) => {
                                    this.address = c;
                                }} className="page-my-profile-verify-text" onChange={this.onTextChanged}/>
                            </div>
                              <div className="line1px"/>
                        </div>
                        : null
                }
            </div>
        )
    }

    handleOtherInfoSelectClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
    }

    //单选控件
    renderOtherInfoSelect(item) {
        const data = item;
        const key = data.key;
        const options = data.options.split(",");
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                    <label htmlFor={`${key}`}>
                        <select id={`${key}`} onChange={this.handleOtherInfoSelectClick}
                        >
                            <option value="-1"/>
                            {options.map((item1, keys) =>
                                <option value={item1} key={keys}>{item1}</option>)}
                        </select>
                    </label>
                </div>
                <div className="line1px"/>
            </div>
        )
    }

    //多选控件
    onChange = (key, val) => {
        this.pushExtendsArray(key, val, true)
    };

    renderOtherInfoCheckbox(item1) {
        const CheckboxItem = Checkbox.CheckboxItem;
        const AgreeItem = Checkbox.AgreeItem;
        let labels = item1.options.split(',');
        let data = [];
        labels.map((item, index) => {
            let obj = {};
            obj.value = index;
            obj.label = item;
            data.push(obj);
        });
        return (
            <div className="">
                <List renderHeader={() => item1.label}>
                    {data.map(i => (
                        <CheckboxItem key={`${item1.key}${i.value}`} onChange={() => this.onChange(item1.key, i.label)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
            </div>
        )
    }

    //单行
    renderOtherInfoInput(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div>
                    <div className="page-my-profile-verify-header-box">
                        <div className="page-my-profile-verify-fonts">{data.label}</div>
                        <input id={`${key}`} className="page-my-profile-verify-text"
                               onChange={this.handleOtherInfoInputClick}/>
                    </div>
                    <div className="line1px"/>
                </div>
            </div>
        )
    }

    handleOtherInfoInputClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
    }

    // 多行
    renderOtherInfoManyInput(item) {
        const data = item;
        const key = data.key;
        return (

            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                </div>

                <textarea placeholder={`请输入${data.label}`}
                          id={`${key}`}
                          className="page-my-profile-edit-text" maxLength="200"
                          onKeyUp={this.handleOtherInfoManyInputClick}
                />

                <div className="line1px"/>
            </div>
        )
    }

    handleOtherInfoManyInputClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
    }

    // 选择时间
    renderOtherInfoDate(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">{data.label}</div>

                    <DatePicker
                        mode="date"
                        format="YYYY-MM-DD"
                        value={this.state[key]}
                        extra={`请选择${data.label}`}
                        onOk={v => (this.pushExtendsArray(key, formatDate(v)), this.state[key] = v, console.log(v))}
                        onDismiss={v => (this.pushExtendsArray(key, null), this.state[key] = null, console.log(v))}

                    >

                        <this.CustomChildren/>

                    </DatePicker>

                </div>
                <div className="line1px"/>
            </div>
        )
    }

    renderOtherInfoDateTime(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                    <DatePicker
                        mode="datetime"
                        format="YYYY-MM-DD HH:mm"
                        value={this.state[key]}
                        extra={`请选择${data.label}`}
                        onOk={v => (this.pushExtendsArray(key, formatDate(v, true)), this.state[key] = v, console.log(v))}
                        onDismiss={v => (this.pushExtendsArray(key, null), this.state[key] = null, console.log(v))}

                    >

                        <this.CustomChildren/>
                    </DatePicker>
                </div>
                <div className="line1px"/>
            </div>
        )
    }

    // 上传图片
    onPicClick(e) {
        var key = e.target.id;
        const attachment = this.state[key];
        uploadToWX({
            success: (urls) => {
                console.log('图片上传成功:', urls);
                attachment.push(urls[0]);
                this.state[key] = attachment;

                this.pushExtendsArray(key, attachment)
            },
        });
    }

    onPicDel(e) {
        const num = e.target.id;
        var key = e.target.name;
        const attachment = this.state[key];
        attachment.splice(num, 1);
        this.state[key] = attachment;
        this.pushExtendsArray(key, attachment)
    }

    renderOtherPic(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box-pic-fonts">{data.label}</div>
                <div className="page-post-container-photo-container">
                    {
                        this.state[key].map((item, key) => (
                            <div className="page-applys-item-render-container">
                                <div className="page-applys-item-view">
                                    <Avatar src={item} size={{width: 100, radius: 1}}/>
                                </div>
                                <div className="page-applys-item-render-del" onClick={this.onPicDel} id={key} key={item}
                                     name={`${key}`}/>
                            </div>
                        ))
                    }
                    {
                        this.state[key].length === 3 ?
                            <div/> :
                            <div
                                className="page-post-item-upload-container" id={`${key}`} onClick={this.onPicClick}
                            />
                    }
                </div>
                <div className="line1px"/>
            </div>
        )
    }

    // push 数组
    /*
    * key 键
    * value 值
    * isMany 是否多选 true是 false否
    * */
    pushExtendsArray(key, value, isMany) {
        let mapInit = false;
        let objInit = false;
        const extendsArray = this.state.extendsArray;
        extendsArray.map((item, index) => {
            for (var i in item) {
                if (i === key) {
                    if (isMany) {
                        item[key] = String(item[key]) + ',' + String(value);
                    } else {
                        item[key] = value;
                    }
                    mapInit = true;
                    objInit = true;
                    break;
                } else {
                    mapInit = false;
                }
            }
        });
        if (!mapInit && !objInit) {
            extendsArray.push({[key]: value});
        }
        console.log(extendsArray);
        this.setState({
            ...this.state,
            extendsArray,

        })
    }

    renderOtherInfo() {
        return (
            <div>
                {
                    this.state.winOrgInfo.extends.length && this.state.winOrgInfo.extends.map((item, index) => {
                        switch (item.type) {//单项选择
                            case 1:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoSelect(item)}
                                    </div>
                                );
                                break;
                            //多项选择
                            case 2:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoCheckbox(item)}
                                    </div>
                                );
                                break;
                            //单行输入
                            case 3:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoInput(item)}
                                    </div>
                                );
                                break;
                            //多行输
                            case 4:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoManyInput(item)}
                                    </div>
                                );
                                break;

                            //上传图片
                            case 5:
                                return (
                                    <div key={index}>
                                        {this.renderOtherPic(item)}
                                    </div>
                                );
                                break;
                            //日期空间
                            case 6:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoDate(item)}
                                    </div>
                                );
                                break;
                            //日期时间空间
                            case 7:
                                return (
                                    <div key={index}>
                                        {this.renderOtherInfoDateTime(item)}
                                    </div>
                                );
                                break;
                            default:
                                return
                        }

                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className="page-my-profile-verify-container">
                <div className="page-my-profile-verify-main">
                    {/*<div className="page-my-profile-verify-title">实名认证信息</div>*/}
                    {
                        //头像
                        this.renderAvatars()
                    }
                    {
                        //名字
                        this.renderName()
                    }

                    {
                        //身份证
                        this.renderIdCard()
                    }

                    {
                        //民族
                        this.renderNation()
                    }

                    {/*<div className="page-my-profile-verify-header-box-nowaddress">*/}
                    {/*现住地址*/}
                    {/*</div>*/}
                    {
                        //地址
                        this.renderAddr()
                    }
                    {
                        this.renderOtherInfo()
                    }
                </div>

                <div className="page-my-profile-verify-btn" onClick={this.onSubmit}>提交</div>
            </div>
        );
    }
}

Verify.title = '实名认证';
Verify.propTypes = {
    checkUser: PropTypes.func,
    requestUserInfo: PropTypes.func,
    addressDataAction: PropTypes.func,
    address: PropTypes.shape({
        data: PropTypes.shape({
            province: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    lat: PropTypes.string,
                    level: PropTypes.number,
                    lon: PropTypes.string,
                    name: PropTypes.string,
                    parent_id: PropTypes.number,
                    short_name: PropTypes.string,
                    sort: PropTypes.number,
                    stt: PropTypes.number,
                }),
            ),
            city: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    lat: PropTypes.string,
                    level: PropTypes.number,
                    lon: PropTypes.string,
                    name: PropTypes.string,
                    parent_id: PropTypes.number,
                    short_name: PropTypes.string,
                    sort: PropTypes.number,
                    stt: PropTypes.number,
                }),
            ),
            county: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    lat: PropTypes.string,
                    level: PropTypes.number,
                    lon: PropTypes.string,
                    name: PropTypes.string,
                    parent_id: PropTypes.number,
                    short_name: PropTypes.string,
                    sort: PropTypes.number,
                    stt: PropTypes.number,
                }),
            ),
        }),
    }),
    check: PropTypes.shape({
        fetching: PropTypes.bool,
        failed: PropTypes.bool,
    }),
    route: PropTypes.shape({
        params: PropTypes.shape({
            userId: PropTypes.string,
        }),
    }),
};

export default connect(
    state => ({
        user: state.user,
        address: state.info.address,
        check: state.info.checkUser,
    }),
    dispatch => bindActionCreators({
        requestUserInfo, checkUser, addressDataAction, userDefinedInfo
    }, dispatch),
)(Verify);
