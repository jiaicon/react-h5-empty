import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import './city_page.css';
import Link from '../../../components/link/link';
import { getCity } from '../../../utils/funcs';
import { requestHomeData, saveCity } from '../home.store';
import { addressDataAction } from '../../my/profile/profile.store';

class CityPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);


    this.state = {
      city: props.home.city || '定位中',
      renderTrigger: true,
    };
  }

  componentWillMount() {
    this.props.addressDataAction(0);
    console.log(this.props);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  handleProvinceClick(event) {
    console.log(event.target.getAttribute('value'));
    console.log(event.target.getAttribute('name'));
    this.props.addressDataAction(event.target.getAttribute('value'));
    this.setState({
      renderTrigger: false,
    });
  }
  proviceRender() {
    const province = this.props.address.data.province;
    return (
      <ul>
        <li>
          <div className="page-select-city-container-style">xxxxx</div>
          <div className="line1px" />
        </li>
        { province && province.map((item, keys) =>
          <li >
            <div className="page-select-city-container-style" key={keys} value={item.id} name={item.name} onClick={this.handleProvinceClick}>{item.name}</div>
            <div className="line1px" />
          </li>)
        }
      </ul>
    );
  }
  cityRender() {
    console.log(this.props.address.data);
    const city = this.props.address.data.city;
    return (
      <ul>
        <li>
          <div className="page-select-city-container-style">xxxxx</div>
          <div className="line1px" />
        </li>
        { city && city.map((item, keys) =>
          <li >
            <div className="page-select-city-container-style" key={keys} value={item.id} name={item.name} onClick={this.handleProvinceClick}>{item.name}</div>
            <div className="line1px" />
          </li>)
        }
      </ul>
    );
  }
  render() {
    return (
      <div className="page-select-city-container">
        <div className="page-select-city-container-header">当前城市：xx-xx</div>
        <div className="line1px" />
        {this.state.renderTrigger ? this.proviceRender() : this.cityRender()}
      </div>
    );
  }
}

CityPage.propTypes = {
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
    home: state.home,
    user: state.user,
    address: state.info.address,
  }),
  dispatch => bindActionCreators({ requestHomeData, saveCity, addressDataAction }, dispatch),
)(CityPage);
