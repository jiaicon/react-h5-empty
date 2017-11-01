/**
 * @file 平台介绍
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../my.store';
import './help.css';

class Help extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-introduce">
        <h5 className="page-introduce-title">志多星使用帮助</h5>
        <h6 className="page-introduce-subtitle"> 一、志愿者注册</h6>
        <div className="page-introduce-content page-introduce-take-up"> 点击首页中【登录】，选择左下角【个人注册】，填写资料进行提交，注册成功。</div>
        <h6 className="page-introduce-subtitle"> 二、志愿团队注册</h6>
        <div className="page-introduce-content page-introduce-take-up"> 点击首页中【登录】，选择右下方【团队注册】，填写资料，搜索上级团队名称【选择上级团队】，完善信息等待审核通过；</div>

        <h6 className="page-introduce-subtitle">三、志愿者加入志愿团队</h6>
        <div className="page-introduce-content page-introduce-take-up">微信志多星首页，点击团队，选择您要加入的团队，点击进入，点击【我要加入】，等待团队管理员审核通过会有手机短信提示已成功加入团队；</div>


        <h6 className="page-introduce-subtitle">四、志愿者加入志愿项目</h6>
        <div className="page-introduce-content page-introduce-take-up">
        微信志多星首页，点击志愿项目，选择所要参与的项目，点击进入，点击【我要报名】等待项目管理员审核通过会有手机短信提示已成功报名项目；
        </div>

        <h6 className="page-introduce-subtitle">五、添加我的志愿家庭成员</h6>
        <div className="page-introduce-content page-introduce-take-up">
          点击右下角的【个人中心】-【我的家庭】点击添加成员，填写账号密码信息完成账号申请；可查看到我的家庭的各成员完成的总的累计时长;
        </div>

        <h6 className="page-introduce-subtitle">六、志愿者打卡签到</h6>
        <div className="page-introduce-content page-introduce-take-up">
        点击微信志多星首页点击【签到打卡】，进入后点击【点击签到】，扫描对应项目签到二维码获取项目志愿时长;
        </div>

        <h6 className="page-introduce-subtitle">七、签到补录</h6>
        <div className="page-introduce-content page-introduce-take-up">
        可在个人中心中点击【补录时长】发起对应的项目补录申请等待项目管理员审核通过；
        </div>

        <h6 className="page-introduce-subtitle">八、志愿团队发起项目</h6>
        <div className="page-introduce-content page-introduce-take-up">
        登录后台PC端微信端均可发布项目，发布审核的权限是根据当前团队的权限是否审核；
        </div>

        <h6 className="page-introduce-subtitle">九、团队管理</h6>
        <div className="page-introduce-content page-introduce-take-up">
        机构管理员或上级团队管理员可对团队进行审核功能；
        机构管理员或上级团队管理员可对团队列表中成员的权限进行相应分配，发放的权限的不同执行的功能就不相同；；
        </div>

        <h6 className="page-introduce-subtitle">十、项目管理</h6>
        <div className="page-introduce-content page-introduce-take-up">
        项目管理员可对项目进行相关的查看编辑和签到码的设定、时长录用等管理
        后台中可对发布的项目进行审核、时长审批等操作满足各种项目情况；
        </div>

        <h6 className="page-introduce-subtitle">十一、后台志愿者管理</h6>
        <div className="page-introduce-content page-introduce-take-up">
        后台可对相关志愿者成员进行管理；
        </div>

        <h6 className="page-introduce-subtitle">十二、站内信息通知</h6>
        <div className="page-introduce-content page-introduce-take-up">
        团队可对相关团队成员进行站内信息通知和下发；
        项目管理员可对相关项目内加入的成员进行相关站内信息发布；
        </div>


      </div>
    );
  }
}


Help.title = '使用帮助';

Help.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Help);
