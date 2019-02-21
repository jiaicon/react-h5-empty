import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { list } from './../../fundingApplication/fundingApplication.store';
import ListItem from './list_item/list_item';

class Projects extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
      this.props.list()
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
      const { data} = this.props.listData;
      console.log(data);
      return (
      <div className="pages-funding-application-list-container">
          <ListItem data={data}/>
      </div>
    );
  }
}
Projects.propTypes = {
    list: PropTypes.func,
    listData: PropTypes.shape({

    })
};

export default connect(
  state => ({
      listData: state.fundingApplication.fundingApplicationList
  }),
  dispatch => bindActionCreators({
      list
  }, dispatch),
)(Projects);
