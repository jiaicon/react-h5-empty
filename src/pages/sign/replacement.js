import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "react-s-alert";
import { projectCheckedApply, requestClockClassList, getProjectClockList, projectCheckedSubmit } from "../sign/sign.store";
import classnames from "classnames";
import moment from "moment";
import history from "../history";
import { createForm, formShape } from 'rc-form';
import { Picker, List, DatePicker, TextareaItem } from 'antd-mobile';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import UploadPhoto from '../../components/uploadPhoto/uploadPhoto';

import './replacement.css';

class Replacement extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.Id = props.route.params.Id;
        this.proid = props.route.params.proid;
        this.state = {turnMap: false};
    }

    componentWillMount() {
        this.getProjectSign();
        this.getProjectClockList(this.proid);
    }
    componentWillReceiveProps(nextprops) {
        const { failed: ngFailed, fetching: ngFetching } = nextprops.getProjectClockListData;
        const { failed: pgFailed, fetching: pgFetching } = this.props.getProjectClockListData;
        if(!pgFailed && pgFetching && !ngFailed && !ngFetching) {
            this.change = false;
            nextprops.getProjectClockListData.list.map(item=>{
                if(item.id==this.Id) {
                    console.log(item)
                    this.change = false;
                    this.setState({
                        clockTimeData: item,   //补卡时为补卡时间   签到时为开始时间
                    });
                }
            });
        }

        const { failed: nFailed, fetching: nFetching } = nextprops.projectCheckedSubmitData;
        const { failed: pFailed, fetching: pFetching } = this.props.projectCheckedSubmitData;
        if(!pFailed && pFetching && !nFailed && !nFetching) {
            Alert.success('申请补卡成功');
            location.replace(`/sign/signdetail/detail/${this.proid}/${this.Id}`);
        }
    }
    getProjectSign() {
        this.props.projectCheckedApply();
    }
    getProjectClass(id) {
        this.props.requestClockClassList(id);
    }
    projectChecked() {
        this.props.projectChecked(this.Id);
    }
    getProjectClockList(id) {
        this.props.getProjectClockList(id);
        delete this.state.clockTimeData;
    }
    onPhotoChange(images) {
        this.setState({
            imagesArr: images.map(item=>item.url)
        })
    }
    onSubmit() {
        this.props.form.validateFields((error, value) => {
            if(error) {
                Alert.error('存在必填项，请完善后重新提交');
                return;
            }
            let data = {
                content: value.content,
                id: value.id[0],
                clock_in_time: moment(value.clock_in_time).format('YYYY-MM-DD HH:mm:ss')
            };
            if('clock_end_time' in value) {
                data.clock_end_time = moment(value.clock_end_time).format('YYYY-MM-DD HH:mm:ss');
            }
            if(this.state.imagesArr&&this.state.imagesArr.length) {
                data.attachment = this.state.imagesArr;
            }
            this.props.projectCheckedSubmit(data);
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { data: proApplyList } = this.props.projectCheckedApplyData;
        let { list: getProjectClockListData } = this.props.getProjectClockListData;
        let proApplyListData = [];
        let getProjectClockList = [];
        proApplyList&&proApplyList.map((item)=>{
            proApplyListData.push({
                label: item.name,
                value: item.id
            })
        });
        getProjectClockListData&&getProjectClockListData.map((item)=>{
            getProjectClockList.push({
                label: `${moment(item.begin).format("YYYY/MM/DD")} - ${moment(item.end).format("YYYY/MM/DD")}`,
                value: item.id
            });
        });
        return <div className="pages-sign-project-apply">
            <div className="pages-sign-project-apply-line">
                <Picker
                    data={proApplyListData}
                    cols={1}
                    {...getFieldProps('proApplyPicker',{
                        rules: [{
                            required: true
                        }],
                        onChange: (val)=> {
                            if(val.length) {
                                this.change = true;
                                this.getProjectClockList(val[0]);
                            }
                        },
                        initialValue: [Number(this.proid)]
                    })}
                >
                    <List.Item arrow="horizontal">参加项目</List.Item>
                </Picker>
            </div>
            <div className="pages-sign-project-apply-line">
                <Picker
                    data={getProjectClockList}
                    cols={1}
                    disabled={this.state.picker_one}
                    onOk={()=>{this.change = false;}}
                    {...getFieldProps('id', {
                        initialValue: [Number(this.Id)],
                        rules: [{
                            required: true
                        }],
                        onChange: (val)=> {
                            if(val.length) {
                                getProjectClockListData&&getProjectClockListData.map((item)=>{
                                    if(item.id==val[0]) {
                                        this.change = true;
                                        this.setState({
                                            clockTimeData: item,   //补卡时为补卡时间   签到时为开始时间
                                        });
                                    }
                                })
                            }
                        }
                    })}
                >
                    <List.Item arrow="horizontal">补卡班次</List.Item>
                </Picker>
            </div>
            <div className="pages-sign-project-apply-line">
                <DatePicker
                    mode="datetime"
                    minDate={new Date(moment(this.state.clockTimeData&&this.state.clockTimeData.begin))}
                    maxDate={this.state.clockTimeData&&this.state.clockTimeData.type == 2 ? new Date(moment(this.state.clockTimeData&&this.state.clockTimeData.end)) : new Date(moment(this.state.clockTimeData&&this.state.clockTimeData.end))}
                    disabled={!this.state.clockTimeData}
                    {...getFieldProps('clock_in_time', {
                        rules: [{
                            required: true
                        }],
                        normalize: (val)=>{
                            if(this.change) {
                                return null;
                            }
                            return val;
                        }
                    })}
                >
                    <List.Item arrow="horizontal">{this.state.clockTimeData&&this.state.clockTimeData.type == 2? '签到补卡时间' : '补卡时间'}</List.Item>
                </DatePicker>
            </div>
            {
                this.state.clockTimeData&&this.state.clockTimeData.type == 2 ?
                    <div className="pages-sign-project-apply-line">
                        <DatePicker
                            mode="datetime"
                            minDate={new Date(moment(this.state.clockTimeData&&this.state.clockTimeData.begin))}
                            maxDate={new Date((moment(this.state.clockTimeData&&this.state.clockTimeData.end).subtract(-1, 'days').subtract(1, 'seconds')).format("YYYY/MM/DD HH:mm:ss"))}
                            disabled={!this.state.clockTimeData}
                            {...getFieldProps('clock_end_time', {
                                rules: [{
                                    required: true
                                }],
                                normalize: (val)=>{
                                    if(this.change) {
                                        return null;
                                    }
                                    return val;
                                }
                            })}
                        >
                            <List.Item arrow="horizontal">签退补卡时间</List.Item>
                        </DatePicker>
                    </div>
                    : null
            }
            <div className="pages-sign-project-apply-line">
                <TextareaItem
                    placeholder="申请说明（200字内）"
                    rows={3}
                    {...getFieldProps('content', {
                        rules: [{
                            required: true
                        }],
                    })}
                />
            </div>
            <div className="pages-sign-project-apply-line">
                <div className="pages-sign-project-apply-line-img-title">工作证明图片(选填)</div>
                <div className="pages-sign-project-apply-line-img-box">
                    <UploadPhoto onChange={this.onPhotoChange} multiple={false} length={3} totle={3} />

                </div>
            </div>
            <div className="pages-sign-project-apply-line-submit" onClick={this.onSubmit}>提交</div>
        </div>
    }
}

Replacement.title = "补卡申请";

Replacement.propTypes = {
    form: formShape
};
let ReplacementForm = createForm()(Replacement);

export default connect(
    state => ({
        projectCheckedApplyData: state.sign.projectCheckedApply,
        clockclasslistData: state.sign.clockclasslist,
        getProjectClockListData: state.sign.getProjectClockList,
        projectCheckedSubmitData: state.sign.projectCheckedSubmit
    }),
    dispatch => bindActionCreators({ projectCheckedApply, requestClockClassList, getProjectClockList, projectCheckedSubmit }, dispatch)
)(ReplacementForm);
