/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './style.css';
import Link from '../../../../components/link/link';
import Avatar from '../../../../components/avatar/avatar';
import PERSONINFO from '../../../../components/personInfo';

class IndexItem extends React.Component {

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
    const data = this.props.data;
    if (!data.list) {
      return null;
    } else if (data.list && !data.list.length) {
      return <div className="component-page-starmodel-empty-tip">目前还没有党员信息</div>;
    }
    // console.log(list);
    return (
      <div>
        {
          data.list.map(item => (
            <div className="component-page-starmodel" key={item.id}>
              <Link to={`/sanlitun/starModel/detail/${item.id}`}>
                <div className="component-page-starmodel-takeup" />
                <div className="component-page-starmodel-container">

                  <PERSONINFO className="component-page-starmodel-top" data={item} />
                  <div className="line1px" />
                  <div className="component-page-starmodel-bottom">{item.abstracts}</div>
                </div>
              </Link>
            </div>
          ))
      }

      </div>

    );
  }
}

IndexItem.propTypes = {
  data: PropTypes.shape({}),

};

export default IndexItem;
