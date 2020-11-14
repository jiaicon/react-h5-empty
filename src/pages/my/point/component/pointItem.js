/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { translate } from 'react-i18next';
import './pointItem.css';

Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
};
class PointItem extends React.Component {

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
    const { t, isPay, data } = this.props;
    return (
      <div className="component-point-item-container">
        {
          isPay ?
            data.map(item => (
              <div>
                <div className="component-point-item">
                  <span>{new Date(Date.parse(item.created_at.replace(/-/g, '/'))).Format('yyyy-MM-dd')}</span>
                  <span>-{item.score}</span>
                </div>

                <div className="line1px" />
              </div>
              ))
            :
            data.map(item => (
              <div>
                <div className="component-point-item-income">
                  <span>{t(item.remark)}</span>
                  <span>{new Date(Date.parse(item.created_at.replace(/-/g, '/'))).Format('yyyy-MM-dd')}</span>
                  <span>+{item.score}</span>
                </div>
                <div className="line1px" />
              </div>
              ))
        }
      </div>
    );
  }
}

PointItem.propTypes = {
  isPay: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({

  })),

};

export default translate('translations')(PointItem);
