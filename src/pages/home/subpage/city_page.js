import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import './city_page.css';
import Link from '../../../components/link/link';
import { getCity } from '../../../utils/funcs';
import history from '../../history';
import { requestHomeData, saveCity, getAreaCity } from '../home.store';
import { addressDataAction } from '../../my/profile/profile.store';

class CityPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      province: JSON.parse(localStorage.getItem('provinceAndCityName')).province,
      city: JSON.parse(localStorage.getItem('provinceAndCityName')).city,
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
    const data = JSON.parse(event.target.getAttribute('data')).item;
    const lat = data.lat;
    const lng = data.lon;
    const expires = Date.now() + (5 * 60 * 1000);
    localStorage.setItem('location', JSON.stringify({
      lat,
      lng,
      expires,
    }));
    const province = data.name;
    localStorage.setItem('provinceAndCityName', JSON.stringify({
      province,
      city: null,
    }));
    const id = data.id;
    this.setState({
      ...this.state,
      province,
      city: null,
    });
    this.props.saveCity();
    this.props.addressDataAction(id);

    this.setState({
      renderTrigger: false,
    });
  }
  // <li>
  //         <div className="page-select-city-container-style">全国</div>
  //         <div className="line1px" />
  //       </li>
  proviceRender() {
    const province = this.props.address.data.province;
    return (
      <ul>

        { province && province.map((item, keys) =>
          <li >
            <div className="page-select-city-container-style" key={keys} data={JSON.stringify({ item })} onClick={this.handleProvinceClick}>{item.name}</div>
            <div className="line1px" />
          </li>)
        }
      </ul>
    );
  }
  handleCityClick(event) {
    const data = JSON.parse(event.target.getAttribute('data')).item;
    const lat = data.lat;
    const lng = data.lon;
    const expires = Date.now() + (5 * 60 * 1000);
    localStorage.setItem('location', JSON.stringify({
      lat,
      lng,
      expires,
    }));
    const city = data.name.replace('市', '');
    const province = this.state.province;
    localStorage.setItem('provinceAndCityName', JSON.stringify({
      province,
      city,
    }));
    this.props.saveCity(city);
    const id = data.id;
    this.setState({
      ...this.state,
      city,
    });
    this.props.getAreaCity(city);
    history.replace('/');
  }
  cityRender() {
    console.log(this.props.address.data);
    const city = this.props.address.data.city;
    return (
      <ul>
        { city && city.map((item, keys) =>
          <li >
            <div className="page-select-city-container-style" key={keys} data={JSON.stringify({ item })}onClick={this.handleCityClick}>{item.name}</div>
            <div className="line1px" />
          </li>)
        }
      </ul>
    );
  }
  render() {
    return (
      <div className="page-select-city-container">
        <div className="page-select-city-container-header">当前城市:
        <span>{this.state.province || null}</span>{this.state.city ? ' - ' : null}<span>{this.state.city === '克孜勒苏柯尔克孜自治州' ? '克孜勒苏柯尔克孜' : this.state.city || null}</span></div>
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
    home: state.home,
    user: state.user,
    address: state.info.address,
  }),
  dispatch => bindActionCreators({ requestHomeData, saveCity, addressDataAction, getAreaCity }, dispatch),
)(CityPage);
