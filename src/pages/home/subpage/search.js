import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './search.css';

import Link from '../../../components/link/link';
import history from '../../history';

import TEAMPAGE from '../../team/search/search';
import PROJECTPAGE from '../../project/search/search';

const TAB_URL_MAPS = {
  '/homesearch/team': <TEAMPAGE />,
  '/homesearch/project': <PROJECTPAGE />,
};
class homesearch extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      page: this.getTabName(this.props),
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      page: this.getTabName(nextProps),
    });
  }

  componentWillUnmount() {}
  getTabName(props) {
    return TAB_URL_MAPS[(props || this.props).route.path];
  }

  render() {
    const { page } = this.state;
    const { path } = this.props.route;
    return (
      <div className="page-homesearch-container">
        <div style={{ width: '100%', height: '50px' }}>
          <ul className="page-homesearch-tab-container">
            <li>
              <Link to="/homesearch/team">
                <div
                  className={classnames({
                    'page-homesearch-li-a-div-style': true,
                    active: path === '/homesearch/team',
                  })}
                >团队搜索</div>
              </Link>
            </li>
            <li>
              <Link to="/homesearch/project">
                <div
                  className={classnames({
                    'page-homesearch-li-a-div-style': true,
                    active: path === '/homesearch/project',
                  })}
                >项目搜索</div>
              </Link>
            </li>
          </ul>
          <div className="line1px" style={{ width: '100%' }} />
        </div>
        <div className="page-homesearch-content-main">
          {page}
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
