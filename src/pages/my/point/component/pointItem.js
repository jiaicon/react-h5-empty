/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './pointItem.css';

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
    const isPay = this.props.isPay;
    const data = this.props.data;
    console.log(data);
    return (
      <div className="component-point-item-container">
        {
          isPay ?
            data.map(item => (
              <div className="component-point-item">
                <span>{item.created_at.split(' ')[0]}</span>
                <span>-{item.score}</span>
              </div>
              ))
            :
            data.map(item => (
              <div className="component-point-item-income">
                <span>{item.remark}</span>
                <span>{item.created_at.split(' ')[0]}</span>
                <span>+{item.score}</span>
              </div>
              ))
        }
        <div className="line1px" />
      </div>
    );
  }
}

PointItem.propTypes = {
  isPay: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({

  })),

};

export default PointItem;
