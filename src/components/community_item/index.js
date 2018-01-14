/**
 * @file 社区项目
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import Link from '../link/link';
import AVATAR from '../avatar/avatar';
import IMAGE from '../image/image';
import './index.css';

class COMMUNITYITEM extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    // const photo = ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg'];
    const photo = ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515572149241&di=31b69e9b3ef12edc0d43505164b7f809&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018d4e554967920000019ae9df1533.jpg%40900w_1l_2o_100sh.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515572149240&di=d74e0d98db641f5b47365973f2383c77&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b52855dc4b6932f875a13252f0e4.jpg%401280w_1l_2o_100sh.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4166721891,1503444760&fm=27&gp=0.jpg',
    ];
    return (

      <ul className="components-community-item-container">
        <li className="components-community-item-main">
          <div className="components-community-item">
            <AVATAR size={{ width: 40, height: 40, radius: 4 }} className="components-community-item-avatar" />
            <div className="components-community-item-main">
              <p className="components-community-item-name">Joseph Elliott</p>
              <div
                className={classnames({
                  ' components-community-item-content-style': true,
                  'components-community-item-content-style-off': true,
                  'components-community-item-content-style-on': false,
                })}
              >公益活动是现代社会条件下的产物，是公民参与精神的表征。公益活动要生产出有利于提升公共安全、有利于增加社会福利的公共产品。在组织公益活动时，要遵循公德、符合公意，努力形成参与者多赢共益的良好氛围。因而，公益活动至少应该</div>
              <div className="components-community-item-content-btn">查看全文</div>
              <ul className="components-community-item-photo-area">
                {
                  photo.length && photo.length >= 1 ?
                  photo.length === 1 ?
                    <li className="components-community-item-photo-area-li-single">
                      <IMAGE src={photo} className="components-community-item-photo-area-single" />
                    </li> :
                    photo.map(item => (

                      <li className="components-community-item-photo-area-li-several">
                        <IMAGE src={item} className="components-community-item-photo-area-several" />
                      </li>
                      ))
                  : null
              }
              </ul>
              <div className="components-community-item-business-container"># 光盈创新团队</div>
              <div className="components-community-item-footer">
                <div className="components-community-item-footer-container">
                  <div className="components-community-item-footer-time">5分钟前 </div>
                  <div className="components-community-item-footer-del">删除 </div>
                </div>
                <div className="components-community-item-footer-container">
                  <Link to="" className={'components-community-item-footer-like-n'}>12</Link>
                  <Link to="" className={'components-community-item-footer-comment'}>23</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="line1px" />

        </li>
      </ul >
    );
  }
}


COMMUNITYITEM.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default COMMUNITYITEM;
