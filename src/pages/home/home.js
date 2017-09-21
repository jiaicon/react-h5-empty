/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../components/link/link';
import WXShare from '../../components/share';
import './home.css';

import { search } from './home.store';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      keyword: 'react',
    };
  }

  componentWillMount() {
    this.runSearch('react');
  }

  componentDidMount() {
    wx.ready(() => {
      WXShare();
    });
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}

  runSearch(keyword) {
    const { keyword: oldKeyword } = this.props;

    if (keyword === oldKeyword) {
      return;
    }

    this.props.search(keyword);
  }

  handleChange(evt) {
    this.setState({
      ...this.state,
      keyword: evt.target.value,
    });
  }

  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.runSearch(this.state.keyword);
    }
  }

  render() {
    const { keyword } = this.state;
    const { data } = this.props;

    return (
      <div className="page-home">
        <div className="search-header">
          <h3>Github 检索</h3>
          <div>
            <input placeholder="请输入关键词" value={keyword} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
          </div>
        </div>
        {
          data ?
            <div className="search-result">
              <span>搜索到 {data.total_count} 条结果</span>
              <ul className="respos">
                {
                data.items.map(item => <li key={item.full_name}>
                  <img src={item.owner.avatar_url} alt="" />
                  <Link to={`/repo/${item.full_name}`}>{item.full_name}</Link>
                  <span>{item.stargazers_count}</span>
                </li>)
              }
              </ul>
            </div> : null
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  search: PropTypes.func,
  keyword: PropTypes.string,
  data: PropTypes.shape({
    total_count: PropTypes.number,
    full_name: PropTypes.string,
    stargazers_count: PropTypes.number,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
    }),
  }),
};

export default connect(
  state => state.home,
  dispatch => bindActionCreators({ search }, dispatch),
)(HomePage);
