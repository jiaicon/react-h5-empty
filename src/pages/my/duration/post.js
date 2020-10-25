/**
 * @file 补录申请
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import Alert from "react-s-alert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import "./post.css";
import DutationProjects from "../../../components/duration/projects";
import {
  postapplyAction,
  projectapplyAction,
  projectapplyclockAction
} from "../my.store";
import UploadPhoto from "../../../components/uploadPhoto/uploadPhoto";
import { DatePicker, List } from "antd-mobile";
import "antd-mobile/lib/date-picker/style/css";
import moment from "moment";
const isAndroid = /android/i.test(navigator.userAgent);
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Post extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      popToggle: false,
      attachment: [],
      clock: [],
      begin: null,
      data: {},
      selectItem: null
    };
    this.CustomChildren = ({ extra, onClick }) => (
      <div
        onClick={onClick}
        style={{ height: "40px", lineHeight: "40px", color: "#999" }}
      >
        <span style={{ color: "#999!important" }}>{extra}</span>
      </div>
    );
  }

  componentWillMount() {
    this.props.projectapplyAction();
  }

  componentDidMount() {
    // Android 下 fastclick 影响 select 点击
    if (window.fastclick && isAndroid) {
      window.fastclick.destroy();
      window.fastclick = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { postapply: Cpostapply } = this.props;
    const { postapply: Npostapply } = nextProps;
    if (Cpostapply.fetching && !Npostapply.fetching && !Npostapply.failed) {
      window.location.replace("/my/duration/applys");
    }
  }

  componentWillUnmount() {
    if (!window.fastclick && isAndroid) {
      window.fastclick = FastClick.attach(document.body);
    }
  }

  onTextChanged() {
    const info = this.info.value.replace(/(^\s+)|(\s+$)/g, "");

    this.setState({
      ...this.state,
      info
    });
  }

  onDel(e) {
    const attachment = this.state.attachment;
    const num = e.target.id;
    attachment.splice(num, 1);

    this.setState(...this.state, attachment);
  }
  onPop() {
    this.setState({
      ...this.state,
      popToggle: true
    });
  }
  Popnone() {
    this.setState({
      ...this.state,
      popToggle: false
    });
  }
  HandleClick(item) {
    const data = item;
    console.log(data);
    if (data) {
      this.props.projectapplyclockAction(data.id);
      this.setState({
        data,
        popToggle: false
      });
    }
  }
  onNext() {
    const id = this.state.data.id;
    const { selectItem, attachment, info: content } = this.state;
    const { t } = this.props;
    const data = {};
    if (!id) {
      Alert.warning(t('请选择申请项目'));
    }
    if (!selectItem) {
      Alert.warning(t('请选择申请班次'));
    }
    if (selectItem.type == 1 && !this.state.cardtime) {
      Alert.warning(t('请选择补卡时间'));
    } else if (selectItem.type == 2) {
      if (!this.state.begin) {
        Alert.warning(t('请选择签到时间'));
      }
      if (!this.state.end) {
        Alert.warning(t('请选择签退时间'));
      }
    }
    if (!content) {
      Alert.warning(t('请输入详细说明'));
      return;
    }

    if (attachment.length !== 0) {
      data.attachment = attachment;
    }
    const { postapply: Cpostapply } = this.props;
    if (Cpostapply.fetching) {
      return;
    }
    let arr = [];
    
    data.id = selectItem.id;
    data.content = content;
    if (selectItem.type == 1) {
      let arr = [];
      arr.push(selectItem.begin.split(" ")[0]);
      arr.push(moment(this.state.cardtime).format("HH:mm:ss"));
      data.clock_in_time = arr.join(" ");
    } else {
      let sarr=[];
      let earr = [];
      sarr.push(selectItem.begin.split(" ")[0]);
      sarr.push(moment(this.state.begin).format("HH:mm:ss"));
      earr.push(selectItem.end.split(" ")[0]);
      earr.push(moment(this.state.end).format("HH:mm:ss"));
      data.clock_in_time = sarr.join(" ");
      data.clock_end_time = earr.join(" ");
    }
    this.props.postapplyAction(data);
  }
  onPhotoChange(images) {
    this.setState({
      attachment: images.map(item => item.url)
    });
  }
  handleCardClick() {
    let data = JSON.parse(this.clock.value);
    console.log(data);
    this.setState({
      selectItem: data
    });
  }
  render() {
    const { t } = this.props;
    const { data, attachment, popToggle } = this.state;
    const { data: detaildata } = this.props.projectapplyclock;
    return (
      <div className="page-post-bg">
        <div className="page-post-container">
          <div className="page-post-container-top">
            <div className="page-post-container-item" onClick={this.onPop}>
              <div
                className={classnames({
                  "page-post-font-color": data.name
                })}
              >
                {data.name ? data.name : t('参加项目')}
              </div>
              <div className="page-post-container-item-more" />
            </div>
            <div
              className={classnames({
                "page-post-container-item-select": this.state.selectItem,
                "page-post-container-item-select-false": !this.state
                  .selectItem
              })}
            >
              <label htmlFor="clock">
                <select
                  id="clock"
                  onChange={this.handleCardClick}
                  ref={c => {
                    this.clock = c;
                  }}
                >
                  <option style={{ color: "#999" }} disabled selected>
                    {t('补卡班次')}
                  </option>

                  {detaildata &&
                    detaildata.list &&
                    detaildata.list.map((item, keys) => (
                      <option
                        value={JSON.stringify(item)}
                        key={keys}
                        onChange={this.handleClick}
                        style={{ color: "#333" }}
                      >
                        {item.begin}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            {this.state.selectItem && this.state.selectItem.type == 1 ? (
              <div className="page-post-container-item">
                <DatePicker
                  mode="time"
                  format="HH:mm"
                  value={this.state.cardtime}
                  onChange={cardtime => {
                    this.setState({ cardtime });
                  }}
                >
                  {this.state.cardtime ? (
                    <this.CustomChildren />
                  ) : (
                    <div
                      className="page-profile-publish-container-input "
                      style={{ color: "#999", lineHeight: "40px" }}
                    >
                      {t('打卡时间')}
                    </div>
                  )}
                </DatePicker>
              </div>
            ) : (
              <div>
                <div className="page-post-container-item">
                  <DatePicker
                    mode="time"
                    format="HH:mm"
                    value={this.state.begin}
                    onChange={begin => this.setState({ begin })}
                  >
                    {this.state.begin ? (
                      <this.CustomChildren />
                    ) : (
                      <div
                        className="page-profile-publish-container-input "
                        style={{ color: "#999", lineHeight: "40px" }}
                      >
                        {t('签到补卡时间')}
                      </div>
                    )}
                  </DatePicker>
                </div>
                <div className="page-post-container-item">
                  <DatePicker
                    mode="time"
                    format="HH:mm"
                    value={this.state.end}
                    onChange={end => this.setState({ end })}
                  >
                    {this.state.end ? (
                      <this.CustomChildren />
                    ) : (
                      <div
                        className="page-profile-publish-container-input "
                        style={{ color: "#999", lineHeight: "40px" }}
                      >
                        {t('签退补卡时间')}
                      </div>
                    )}
                  </DatePicker>
                </div>
              </div>
            )}

            <textarea
              className="page-post-container-explain"
              placeholder="申请说明（200字内）"
              maxLength="200"
              ref={c => {
                this.info = c;
              }}
              onBlur={this.onTextChanged}
            />
          </div>
          <div style={{ background: "#fff", marginTop: "15px" }}>
            <div className="page-post-container-photo-text">
              {t('工作证明图片')}({t('选填')})
            </div>
            <div className="page-post-container-photo-container">
              <UploadPhoto
                onChange={this.onPhotoChange}
                multiple={false}
                length={3}
                totle={3}
              />
            </div>
          </div>

          <div className="page-post-btn" onClick={this.onNext}>
            {t('提交')}
          </div>
          {/** 遮罩层* */}
          <div
            className={classnames({
              "page-post-mask-container": true,
              "page-post-pop-block": popToggle
            })}
          >
            <div className="page-post-take-up" onClick={this.Popnone} />
            <div className="page-post-mask-content">
              <DutationProjects
                durationProject={
                  this.props.projectapply.data
                    ? this.props.projectapply.data.list
                    : null
                }
                HandleClick={this.HandleClick}
                isEntry={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.title = i18next.t('申请服务时长');

Post.propTypes = {
  postapplyAction: PropTypes.func,
  projectapplyAction: PropTypes.func,
  projectapply: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }),
  postapply: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  })
};

export default connect(
  state => ({
    postapply: state.my.postapply,
    projectapply: state.my.projectapply,
    projectapplyclock: state.my.projectapplyclock
  }),
  dispatch =>
    bindActionCreators(
      { postapplyAction, projectapplyAction, projectapplyclockAction },
      dispatch
    )
)(translate('translations')(Post));
