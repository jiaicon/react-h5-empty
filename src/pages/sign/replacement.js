import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Alert from "react-s-alert";
import { projectCheckedApply, requestClockClassList, getProjectClockList, projectCheckedSubmit } from "../sign/sign.store";
import moment from "moment";
import { createForm, formShape } from 'rc-form';
import { Picker, List, DatePicker, TextareaItem, InputItem } from 'antd-mobile';
import 'antd-mobile/lib/picker/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import UploadPhoto from '../../components/uploadPhoto/uploadPhoto';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import './replacement.css';

class Replacement extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.Id = props.route.params.Id;
        this.proid = props.route.params.proid;
        this.state = { turnMap: false };
        this.canSubmit = true;
    }

    componentWillMount() {
        this.getProjectSign();
        this.getProjectClockList(this.proid);
    }
    componentWillReceiveProps(nextprops) {
      const { t } = nextprops;
        const { failed: ngFailed, fetching: ngFetching } = nextprops.getProjectClockListData;
        const { failed: pgFailed, fetching: pgFetching } = this.props.getProjectClockListData;
        if (!pgFailed && pgFetching && !ngFailed && !ngFetching) {
            this.change = false;
            nextprops.getProjectClockListData.list && nextprops.getProjectClockListData.list.map(item => {
                if (item.id == this.Id) {
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
        if (!pFailed && pFetching && !nFailed && !nFetching) {
            Alert.success(t('申请补卡成功'));
            this.canSubmit = true;
            if (this.proid == 'proid') {
                location.replace('/my/duration/applys');
            } else {
                location.replace(`/sign/signdetail/detail/${this.proid}/${this.Id}`);
            }
        } else {
            this.canSubmit = true;
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
            imagesArr: images.map(item => item.url)
        })
    }
    onSubmit() {
        if (!this.canSubmit) {
            return;
        }
        this.props.form.validateFields((error, value) => {
          const { t } = this.props;
            if (error) {
                Alert.error(t('存在必填项，请完善后重新提交'));
                this.canSubmit = true;
                return;
            }
            let data = {
                addr: value.addr,
                content: value.content,
                id: value.proApplyPicker[0],
                join_day: moment(value.join_day).format('YYYY-MM-DD'),
                reward_time: value.reward_time,
            };
            if (this.state.imagesArr && this.state.imagesArr.length) {
                data.attachment = this.state.imagesArr;
            }
            this.props.projectCheckedSubmit(data);
        });
    }
    render() {
      const { t } = this.props;
        const { getFieldProps } = this.props.form;
        const { data: proApplyList } = this.props.projectCheckedApplyData;
        let { list: getProjectClockListData } = this.props.getProjectClockListData;
        let proApplyListData = [];
        let getProjectClockList = [];
        proApplyList && proApplyList.map((item) => {
            proApplyListData.push({
                label: item.name,
                value: item.id
            })
        });
        getProjectClockListData && getProjectClockListData.map((item) => {
            getProjectClockList.push({
                label: `${moment(item.begin).format("YYYY/MM/DD HH:mm")} - ${moment(item.end).format("YYYY/MM/DD HH:mm")}`,
                value: item.id
            });
        });
        return <div className="pages-sign-project-apply">
            <div className="pages-sign-project-apply-line">
                <Picker
                    data={proApplyListData}
                    cols={1}
                    okText={t('确定')}
                    dismissText={t('取消')}
                    extra={t('请选择')}
                    {...getFieldProps('proApplyPicker', {
                        rules: [{
                            required: true
                        }],
                        onChange: (val) => {
                            if (val.length) {
                                this.change = true;
                                this.getProjectClockList(val[0]);
                            }
                        },
                        initialValue: [Number(this.proid)]
                    })}
                >
                    <List.Item arrow="horizontal">{t('参加项目')}</List.Item>
                </Picker>
            </div>

            <div className="pages-sign-project-apply-line">
                <DatePicker
                    mode="date"
                    okText={t('确定')}
                    dismissText={t('取消')}
                    extra={t('请选择')}
                    format="YYYY-MM-DD"
                    {...getFieldProps('join_day', {
                        initialValue: undefined,
                        rules: [{
                            required: true
                        }],
                        onChange: (val) => {
                            if (val.length) {
                                getProjectClockListData && getProjectClockListData.map((item) => {
                                    if (item.id == val[0]) {
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
                    <List.Item arrow="horizontal">{t('活动日期')}</List.Item>
                </DatePicker>
            </div>

            <div className="pages-sign-project-apply-line" style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <List.Item>{t('申请时长(小时)')}</List.Item>
                <InputItem
                    {...getFieldProps('reward_time', {
                        rules: [{
                            required: true,
                            max: 8,
                            min: 0.5,
                        }],
                    })}
                    onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                    type="number"
                    placeholder="0-8"
                    style={{ minWidth: '120px', textAlign: 'right' }}
                >
                </InputItem>
            </div>

            <div className="pages-sign-project-apply-line" style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <List.Item>{t('参加活动地点')}</List.Item>
                <InputItem
                    {...getFieldProps('addr', {
                        rules: [{
                            required: true,
                        },
                        {
                            initialValue: this.props.projectCheckedApplyData && this.props.projectCheckedApplyData.data && this.props.projectCheckedApplyData.data.filter(v => `${v.id}` === `${this.props.form.getFieldValue('proApplyPicker')[0]}`)[0] && this.props.projectCheckedApplyData.data.filter(v => `${v.id}` === `${this.props.form.getFieldValue('proApplyPicker')[0]}`)[0].addr || undefined,
                        }
                        ],
                    })}
                    placeholder={t('参加活动地点')}
                    style={{ minWidth: '120px', textAlign: 'right' }}
                >
                </InputItem>
            </div>

            {/* <div className="pages-sign-project-apply-line">
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
            <div className="pages-sign-project-apply-line pages-sign-project-apply-line-special">
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
                    <div className="pages-sign-project-apply-line pages-sign-project-apply-line-special">
                        <DatePicker
                            mode="datetime"
                            minDate={new Date(moment(this.state.clockTimeData&&this.state.clockTimeData.begin))}
                            maxDate={new Date((moment(this.state.clockTimeData&&this.state.clockTimeData.end)).format("YYYY/MM/DD HH:mm:ss"))}
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
            } */}
            <div className="pages-sign-project-apply-line">
                <TextareaItem
                    placeholder={window.orgCode === 'mWZdPNwaKg' ? t('申请说明'):t('申请说明(默认)')}
                    rows={3}
                    {...getFieldProps('content', {
                        rules: [{
                            required: true
                        }],
                    })}
                />
            </div>
            <div className="pages-sign-project-apply-line">
    <div className="pages-sign-project-apply-line-img-title">{window.orgCode === 'mWZdPNwaKg' ? t('活动证明图片'):t('活动证明图片(默认)')}</div>
                <div className="pages-sign-project-apply-line-img-box">
                    <UploadPhoto onChange={this.onPhotoChange} multiple={false} length={3} totle={3} />

                </div>
            </div>
            <div className="pages-sign-project-apply-line-submit" onClick={this.onSubmit}>{t('提交')}</div>
        </div>
    }
}

Replacement.title = i18next.t("申请补卡");

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
)(translate('translations')(ReplacementForm));
