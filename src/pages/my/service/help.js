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
        <h5 className="page-introduce-title">志多星软件使用说明</h5>
        <div className="page-introduce-content page-introduce-take-up">
        欢迎您使用志多星志愿服务管理平台软件（以下简称“本软件”）及服务！本软件由北京志多星科技有限公司开发（以下简称“志多星”）。
        本软件在此特别提醒您（志愿者）在注册成为用户之前，请认真阅读《志多星软件使用说明》
        （以下简称“说明”），同时充分理解并同意遵守链接中的《志多星软件用户使用协议》（以下简称“协议”）中的各条款。
        </div>
        <h6 className="page-introduce-subtitle"> 一、账户注册</h6>
        <div className="page-introduce-content page-introduce-take-up"> 1、用户在使用本服务前需要注册一个本软件帐号。本软件帐号应当使用用户本人经实名认证的手机号码绑定注册。</div>
        <h6 className="page-introduce-subtitle"> 二、软件服务</h6>
        <div className="page-introduce-content"> 1、本软件是免费提供志愿者注册及组织创建的管理功能平台，其注册资料的真实性、有效性由活动的发布方保证。本软件或志多星不承担任何保证责任。</div>
        <div className="page-introduce-content"> 2、本软件给予用户一项个人的、不可转让及非排他性的许可，以使用本软件。用户可以为非商业目的在单一台终端设备上安装、使用、显示、运行本软件。</div>
        <h6 className="page-introduce-subtitle">三、用户信息</h6>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">1、用户在注册帐号或使用本服务的过程中，需要填写或提交必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则无法使用本服务或在使用本服务的过程中受到限制。</div>

          <div className="page-introduce-content">2、用户同意本软件可在以下事项中使用用户的个人隐私信息：</div>

          <div className="page-introduce-content">(1) 本软件向用户及时发送重要通知，如软件更新、本协议条款的变更；</div>

          <div className="page-introduce-content"> (2) 本软件内部进行审计、数据分析和研究等，以改进本软件的产品、服务和与用户之间的沟通；</div>

          <div className="page-introduce-content">(3) 依本协议约定，本软件管理、审查用户信息及进行处理措施；</div>

          <div className="page-introduce-content">(4) 适用法律法规规定的其他事项。</div>

          <div className="page-introduce-content">除上述事项外，如未取得用户事先同意，本软件不会将用户个人隐私信息使用于任何其他用途。</div>

          <div className="page-introduce-content">3、若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本软件使用说明与协议以及使用本服务。任何18岁以下的未成年人注册帐号或使用本服务应事先取得家长或其法定监护人的书面同意。</div>
        </div>

        <h6 className="page-introduce-subtitle">四、软件的安装、更新与卸载</h6>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">1、本软件为不同的终端设备开发了不同的软件版本，用户应当根据实际情况选择下载合适的版本进行安装或选择合适的平台进行使用。</div>

          <div className="page-introduce-content">2、为了改善用户体验、完善服务内容，本软件将不断努力开发新的服务，并为用户不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。</div>
        </div>

        <h6 className="page-introduce-subtitle">五、内容规范</h6>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">1、本软件一直致力于为用户提供文明健康、规范有序的网络环境，用户不得利用本软件帐号或本软件及服务制作、复制、发布、传播侵犯其他用户或第三方合法权益的内容，包括但不限于：</div>

          <div className="page-introduce-content">1.1 发布、传送、传播、储存违反国家法律法规禁止的内容：</div>

          <div className="page-introduce-content">（1）违反宪法确定的基本原则的；</div>

          <div className="page-introduce-content">（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</div>

          <div className="page-introduce-content">（3）损害国家荣誉和利益的；</div>

          <div className="page-introduce-content">（4）煽动民族仇恨、民族歧视，破坏民族团结的；</div>

          <div className="page-introduce-content">（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</div>

          <div className="page-introduce-content">（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</div>

          <div className="page-introduce-content">（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</div>

          <div className="page-introduce-content">（8）侮辱或者诽谤他人，侵害他人合法权益的；</div>

          <div className="page-introduce-content">（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</div>

          <div className="page-introduce-content">（10）以非法民间组织名义活动的；</div>

          <div className="page-introduce-content">（11）不符合遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</div>

          <div className="page-introduce-content">（12）含有法律、行政法规禁止的其他内容的。</div>

          <div className="page-introduce-content">1.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</div>

          <div className="page-introduce-content">1.3 涉及他人隐私、个人信息或资料的。</div>

          <div className="page-introduce-content">1.4 发表、传送、传播骚扰、广告信息及垃圾信息或含有任何性或性暗示的。</div>

          <div className="page-introduce-content">1.5 其他违反法律法规、政策及公序良俗、社会公德或干扰本软件平台正常运营和侵犯其他用户或第三方合法权益内容的信息。</div>

          <div className="page-introduce-content">1.6 不得发布任何与本软件志愿服务目的不适之信息。</div>
        </div>

        <h6 className="page-introduce-subtitle">六、使用规则</h6>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表本软件的观点、立场或政策，本软件对此不承担任何责任。</div>

          <div className="page-introduce-content"> 2、除非法律允许或本软件书面许可，用户使用本服务过程中不得从事下列行为：</div>

          <div className="page-introduce-content"> 2.1 提交、发布虚假信息，或冒充、利用他人名义的；</div>

          <div className="page-introduce-content">2.2 诱导其他用户点击链接页面或分享信息的；</div>

          <div className="page-introduce-content">2.3 虚构事实、隐瞒真相以误导、欺骗他人的；</div>

          <div className="page-introduce-content">2.4 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</div>

          <div className="page-introduce-content">2.5 未经本软件书面许可利用微信帐号和任何功能，以及第三方运营平台进行推广或互相推广的；</div>

          <div className="page-introduce-content">2.6 利用本软件帐号或本软件及服务从事任何违法犯罪活动的；</div>

          <div className="page-introduce-content">2.7 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</div>

          <div className="page-introduce-content">2.8 其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或本软件未明示授权的行为。</div>

          <div className="page-introduce-content">3、用户须对利用本软件帐号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责。</div>
        </div>

        <h6 className="page-introduce-subtitle">七、账户管理</h6>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">  1、本软件帐号的所有权归本软件所有。</div>

          <div className="page-introduce-content">2、用户应遵守志多星使用协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，本软件在通知用户后有权依据协议中断或终止对违约用户本软件帐号提供服务。同时，本软件保留在任何时候收回本软件帐号、用户名的权利。</div>
        </div>

        <div className="page-intoduce-bussiness">北京志多星科技有限责任公司</div>
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
