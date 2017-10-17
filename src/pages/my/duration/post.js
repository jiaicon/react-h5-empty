/**
 * @file 补录申请
 */


/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import './post.css';
import DutationProjects from '../../../components/duration_apply/projects';
import { postapplyAction, projectapplyAction } from '../my.store';
import history from '../../history';
import uploadToWX from '../../../utils/wxupload';

const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com';
class Post extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      popToggle: false,
      limitNum: 3,
      attachment: [],
      data: {},
    };
  }

  componentWillMount() {
    this.props.projectapplyAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { postapply: Cpostapply } = this.props;
    const { postapply: Npostapply } = nextProps;
    if (Cpostapply.fetching && !Npostapply.fetching && !Npostapply.failed) {
      history.replace('/my/applys');
    }
  }

  componentWillUnmount() {}

  onTextChanged() {
    const hours = this.hours.value.replace(/(^\s+)|(\s+$)/g, '');
    const info = this.info.value.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      hours,
      info,
    });
    console.log(hours);
  }
  // 上传照片
  onAvatarClick() {
    const attachment = this.state.attachment;
    uploadToWX({
      success: (urls) => {
        console.log('图片上传成功:', urls);
        attachment.push(urls[0]);
        this.setState({
          ...this.state,
          attachment,
        });
        this.photo = urls[0];
      },
    });
  }

  // onFileSelect(evt) {
  //   const attachment = this.state.attachment;
  //   const file = evt.target.files[0];
  //   if (file) {
  //     const fd = new FormData();
  //     fd.append('file', file);

  //     const xhr = new XMLHttpRequest();
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         const res = JSON.parse(xhr.responseText);

  //         if (!res.error_code) {
  //           attachment.push(res.data.url);
  //           this.setState({
  //             ...this.state,
  //             attachment,
  //           });
  //           this.photo = res.data.url;
  //         } else {
  //           Alert.warning(`图片上传失败：${res.error_message}`);
  //         }
  //       }
  //     };
  //     xhr.open('POST', `${API_HOST}/api/imgupload`, true);
  //     xhr.send(fd);
  //   }
  // }
  onDel(e) {
    const attachment = this.state.attachment;
    const num = e.target.id;
    attachment.splice(num, 1);

    this.setState(
      ...this.state,
      attachment,
    );
  }
  onPop() {
    this.setState({
      ...this.state,
      popToggle: true,
    });
  }
  Popnone() {
    this.setState({
      ...this.state,
      popToggle: false,
    });
  }
  HandleClick(item) {
    const data = item;
    if (data) {
      this.setState({
        data,
        popToggle: false,
      });
    }
  }
  onNext() {
    const id = this.state.data.id;
    const hours = this.state.hours;
    const content = this.state.info;
    const attachment = this.state.attachment;
    const data = {};
    if (!reward_time) {
      Alert('请输入补录时间');
      return;
    }
    if (!content) {
      Alert('请输入详细说明');
      return;
    }
    if (attachment.length !== 0) {
      data[attachment] = attachment;
    } else {
      return;
    }
    data.project_id = id;
    data.reward_time = hours;
    data.content = content;
    this.props.postapplyAction(data);
  }

  render() {
    const popToggle = this.state.popToggle;

    const attachment = this.state.attachment;
    const data = this.state.data;
    return (
      <div className="page-post-bg">
        <div className="page-post-container">
          <div className="page-post-container-item" onClick={this.onPop}>
            <div
              className={classnames({
                'page-post-font-color': data.name,
              })}
            >{data.name ? data.name : '补录时长项目'}</div>
            <div className="page-post-container-item-more" />
          </div>
          <input type="number" className="page-post-container-text" placeholder="申请补录时长(小时)" ref={(c) => { this.hours = c; }} onKeyUp={this.onTextChanged} />
          <textarea className="page-post-container-explain" placeholder="申请说明（200字内）" maxLength="200" ref={(c) => { this.info = c; }} onKeyUp={this.onTextChanged} />
          <div className="page-post-container-photo-text" >工作证明图片(选填)</div>
          <div className="page-post-container-photo-container">
            {
              attachment.map((item, key) => (
                <div className="page-applys-item-render-container">
                  <img src={item} alt="" />
                  <div className="page-applys-item-render-del" onClick={this.onDel} id={key} key={item} />
                </div>
              ))
            }
            {
              attachment.length === 3 ?
                <div /> :
                <div
                  className="page-post-item-upload-container" onClick={this.onAvatarClick}
                />
            }
          </div>
          <div className="page-post-btn" onClick={this.onNext}>提交</div>
          {/** 遮罩层* */}
          <div
            className={classnames({
              'page-post-mask-container': true,

              'page-post-pop-block': popToggle,
            })}
          >

            <div className="page-post-take-up" onClick={this.Popnone} />
            <div className="page-post-mask-content">

              <DutationProjects
                durationProject={this.props.projectapply.data ? this.props.projectapply.data.list : null}
                HandleClick={this.HandleClick}
              />
            </div>


          </div>
        </div>

      </div>
    );
  }
}


Post.title = '补录申请';

Post.propTypes = {
  postapplyAction: PropTypes.func,
  projectapplyAction: PropTypes.func,
  projectapply: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({

        })),


    }),
  }),
  postapply: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
  }),
};

export default connect(
  state => ({
    postapply: state.my.postapply,
    projectapply: state.my.projectapply,
  }),
  dispatch => bindActionCreators({ postapplyAction, projectapplyAction }, dispatch),
)(Post);
