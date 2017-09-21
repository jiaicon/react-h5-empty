/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';

import history from '../history';
import './repo.css';
import { getRepo } from './repo.store';


class RepoPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.parseParams(props);
  }

  componentWillMount() {
    this.props.getRepo(this.owner, this.repo);
  }

  componentWillReceiveProps(nextProps) {
    this.parseParams(nextProps);
  }

  /* eslint-disable class-methods-use-this */
  handleClick() {
    history.goBack();
  }
  /* eslint-enable class-methods-use-this */

  parseParams(props) {
    const { owner, repo } = props.route.params;
    this.owner = owner;
    this.repo = repo;
  }

  isDataOutdate() {
    const { data } = this.props;

    return data && (data.full_name !== `${this.owner}/${this.repo}`);
  }

  render() {
    const { failed, data } = this.props;

    if (this.isDataOutdate()) {
      return null;
    }

    return (<div className="repo-page">
      {
            failed ? <div className="data-error">数据获取失败</div> : null
        }
      {
            data ?
              <div className="repo-detail">
                <h3>{data.full_name}</h3>
                <div>
                  <span>创建时间：{data.created_at}</span>
                </div>
                <div>
                  <span>STARS {data.stargazers_count}</span>
                </div>
              </div>
            :
            null
        }
      <button className="back-button" onClick={this.handleClick}>返回</button>
    </div>);
  }
}

RepoPage.propTypes = {
  getRepo: PropTypes.func,
  data: PropTypes.shape({
    full_name: PropTypes.string,
    created_at: PropTypes.string,
    stargazers_count: PropTypes.number,
  }),
  failed: PropTypes.bool,
};

export default connect(
  state => state.repo,
  dispatch => bindActionCreators({ getRepo }, dispatch),
)(RepoPage);
