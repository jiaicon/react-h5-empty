/**
 * Created by jxt on 2018/4/12.
 */
import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import history from '../../../history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { bindFamilyFun } from './../../my.store';
import './bindFamily.css';

const relations = [{name: '兄弟', id: 0},{name: '姐妹',id: 1},{name: '父子',id: 2},{name: '母女',id: 3}];
function isChoose(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请选择${label}`);
        return true;
    }

    return false;
}
class BindFamily extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }
    checkEmpty(value, label) {
        if (!value || !value.length) {
            Alert.warning(`请填写${label}`);
            return true;
        }
        return false;
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
        const { failed: tFailed, fetching: tFetch } = this.props.bindFamily;
        const { failed: nFailed, fetching: nFetch } = nextProps.bindFamily;
        if(tFetch && !nFetch && !nFailed) {
            history.replace('/my/family');
        }
    }
    bindFamily(){
        const userAccount = this.state.userAccount;
        const  userPassword = this.state.userPassword;
        const  relations = this.state.relations;
        if(this.checkEmpty(userAccount, '账号')||this.checkEmpty(userPassword, '密码')) {
            return;
        }
        if(isChoose(relations, '关系')) {
            return;
        }
        const data = {};
        data.phone = userAccount;
        data.pwd = userPassword;
        data.relation = relations;
        console.log(data)
        this.props.bindFamilyFun(data);
    }
    onTextChanged() {
        const userAccount = this.useraccount.value;
        const userPassword = this.userpassword.value;
        this.setState({
            ...this.state,
            userAccount,
            userPassword
        })
    }
    handlePeopleClick() {
        const relations = this.relations.value;
        this.setState({
            ...this.state,
            relations: relations
        })
    }
    render() {
        return(
            <div className="pages-add-bind-family">
                <div  className="pages-add-bind-family-box">
                    <div className="pages-add-bind-family-name">账号</div>
                    <div  className="pages-add-bind-family-ipt">
                        <input type="text" placeholder="手机号或身份证号"  ref={(c) => { this.useraccount = c; }} onKeyUp={this.onTextChanged}/>
                    </div>
                </div>
                <div className="line1px" />
                <div  className="pages-add-bind-family-box">
                    <div className="pages-add-bind-family-name">密码</div>
                    <div  className="pages-add-bind-family-ipt">
                        <input type="text" placeholder="输入密码"  ref={(c) => { this.userpassword = c; }} onKeyUp={this.onTextChanged}/>
                    </div>
                </div>
                <div className="line1px" />
                <div  className="pages-add-bind-family-box pages-add-bind-family-box-last">
                    <div className="pages-add-bind-family-name">关系</div>
                    <div  className="pages-add-bind-family-ipt">
                        <label htmlFor="relations">
                            <select id="relations" onChange={this.handlePeopleClick} ref={(c) => { this.relations = c; }}>
                                <option value="-1" />
                                { relations && relations.map((item, keys) =>
                                    <option value={item.name} key={keys}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="line1px" />
                <div className="pages-add-bind-family-btn" onClick={this.bindFamily}>添加</div>
            </div>
        )
    }
}
BindFamily.PropTypes = {
    bindFamilyFun: PropTypes.func,
    bindFamily: PropTypes.shape({
        username: PropTypes.string,
        id: PropTypes.number
    })
};
export default connect(
    state => ({
        bindFamily: state.my.bindFamily
    }),
    dispatch => bindActionCreators({
        bindFamilyFun
    }, dispatch),
)(BindFamily);
