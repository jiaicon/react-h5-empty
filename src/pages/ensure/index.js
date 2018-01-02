/**
 * @file 志愿保障
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import history from '../history';

import Link from '../../components/link/link';
import './index.css';
import Image from '../../components/image/image';
import ENSUREITEM from '../../components/ensure_item/index';

import { getInsurance } from './ensure.store';

class ensurePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };
  }

  componentWillMount() {
    this.props.getInsurance();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}
  renderSlick() {
    const { insurance } = this.props;
    if (!insurance.data || !insurance.data.banner) {
      return <div className="slick-container slick-container-empty" />;
    }


    return (<div className="slick-container">
      { insurance.data.banner && insurance.data.banner.length ?
        <Slick {...this.slickSettings}>
          {insurance.data.banner
              .map((item) => {
                let url = '';
                const mode = item.jump_mode;

                if (mode === 1) {
                  // 第三方
                  url = item.href;
                } else if (mode === 2) {
                  // 项目
                  url = `/project/detail/${item.jump_id}`;
                } else if (mode === 3) {
                  // 团队
                  url = `/team/detail/${item.jump_id}`;
                }

                return (<Link key={item.id} to={url}>
                  <Image src={item.photo} className="image" resize={{ width: 1500 }} />
                </Link>);
              })}
        </Slick> : null
      }
    </div>);
  }
  // <IMAGE src="/images/model.png" className="page-ensure-header-pic" />
  render() {
    const { insurance } = this.props;
    if (!insurance.data || !insurance.data.list) {
      return <div />;
    }
    return (
      <div className="page-ensure">
        {this.renderSlick()}

        <ENSUREITEM data={insurance.data.list} />
      </div>
    );
  }
}


ensurePage.title = '志愿保障';

ensurePage.propTypes = {


};

export default connect(
  state => ({
    insurance: state.insurance.insurance,
  }),
  dispatch => bindActionCreators({ getInsurance },
    dispatch),
)(ensurePage);
