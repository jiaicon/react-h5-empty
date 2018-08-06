/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './announcement.css';
import { Carousel } from 'antd-mobile';
import Link  from '../link/link'
class Announcement extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}),
    entry: PropTypes.string,
  }
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
    const { data } = this.props;
    if (!data) {
      return null;
    }

    return (
      <div className="components-announcement-container">

        {
        !data.length ?
          <div>
            <p className="components-announcement-empty-tip-legend">目前还没有公告哦</p>
          </div>
        :
          <Carousel
            className="my-carousel"
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
          >
            {data.map((item, index) => (
              <Link to={this.props.entry}>
                <div className="v-item">{item.title}</div>
              </Link>

        ))
        }
          </Carousel>

       }

      </div>

    );
  }
}

Announcement.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
  showLabel: PropTypes.bool,
};

export default Announcement;
