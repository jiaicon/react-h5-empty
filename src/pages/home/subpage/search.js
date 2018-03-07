import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import classnames from 'classnames';
import cx from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './search.css';

import Link from '../../../components/link/link';
import history from '../../history';
import TabItem from '../components/tab';
import TEAMPAGE from '../../team/search/search';
import PROJECTPAGE from '../../project/search/search';

const TAB_URL_MAPS = {
  team: <TEAMPAGE />,
  project: <PROJECTPAGE />,
};
class homesearch extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: ['项目搜索', '团队搜索'],
      current: 0,
    };
  }
  handleClick(index) {
    this.setState({
      ...this.state,
      current: index,
    });
  }
  currentClass(index) {
    return this.state.current === index ? 'page-homesearch-tab-current-li' : '';
  }
  render() {
    return (
      <div className="page-homesearch-container">
        <ul className="page-homesearch-tab-container">
          { this.state.title.map((val, index) =>
          (<TabItem
            currentClass={this.currentClass}
            handleClick={this.handleClick} val={val} index={index} key={val.name}
          />)) }
        </ul>
        <div className="line1px" />
        <div className="page-homesearch-content">
          <div
            className={cx({
              'page-homesearch-content-main': this.state.current,
              'page-homesearch-content-main-current': !this.state.current,
            })}
          >
            <PROJECTPAGE />

          </div>
          <div
            className={cx({
              'page-homesearch-content-main': !this.state.current,
              'page-homesearch-content-main-current': this.state.current,
            })}
          >
            <TEAMPAGE />
          </div>
        </div>
      </div>
    );
  }
}

homesearch.propTypes = {
  requestHomeData: PropTypes.func,
  saveCity: PropTypes.func,
  home: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        photo: PropTypes.string,
        jump_mode: PropTypes.number,
        jump_id: PropTypes.number,
      })),
      project: PropTypes.arrayOf(PropTypes.shape({})),
      sanlitun: PropTypes.number,
    }),
    city: PropTypes.string,
  }),
  user: PropTypes.shape({}),
  getAreaCity: PropTypes.func,
  addressDataAction: PropTypes.func,
  address: PropTypes.shape({
    data: PropTypes.shape({
      province: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number,
        }),
      ),
      city: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number,
        }),
      ),
    }),
  }),
};

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({ }, dispatch),
)(homesearch);
