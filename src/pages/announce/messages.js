/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './messages.css';
import MessagesItem from './component/messagesItem';
import { announceAction } from './announce.store';
import { isWindowReachBottom } from '../../utils/funcs';

class Messages extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.requestList(false);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.requestList(true);
    }
  }
  requestList(more) {
    const { announce: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.announceAction({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }
  render() {
    const { announce: { data: listData } } = this.props;
    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);
    return (
      <div className="page-announce">
        <MessagesItem data={listData ? listData.list : null} />

        <div>
          {
            showLoadingMore
            ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
              正在加载
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}


Messages.title = '公告';

Messages.propTypes = {
  announceAction: PropTypes.func,
  announce: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          type: PropTypes.number,
          content: PropTypes.string,
          publish_time: PropTypes.string,
          from_user: PropTypes.shape({
            token: PropTypes.string,
            id: PropTypes.number,
            username: PropTypes.string,
            phone: PropTypes.string,
            avatars: PropTypes.string,
            real_name: PropTypes.string,
            nation: PropTypes.string,
            sex: PropTypes.number,
            birthday: PropTypes.string,
            identifier: PropTypes.string,
            slogan: PropTypes.string,
            reward_time: PropTypes.number,
            id_number: PropTypes.number,
            province_id: PropTypes.number,
            province_name: PropTypes.string,
            city_id: PropTypes.number,
            city_name: PropTypes.string,
            county_id: PropTypes.number,
            county_name: PropTypes.string,
            addr: PropTypes.string,
            family_id: PropTypes.number,
            join_family_time: PropTypes.string,
            good_at: PropTypes.arrayOf(PropTypes.shape({

            })),
          }),
        })),
    }),
  }),
};

export default connect(
  state => ({
    announce: state.announce.announce,
  }),
  dispatch => bindActionCreators({ announceAction }, dispatch),
)(Messages);
