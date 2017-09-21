/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react'
import autoBind from 'react-autobind'
import './success.css'
import cx from 'classnames'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import Alert from 'react-s-alert'
import queryString from 'query-string'

import history from '../history'


class SuccessPage extends React.Component {

  constructor(props) {
    super(props)
    autoBind(this)
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div className="success-page">
      
      <img className="success-code" src="/images/flash/success.jpg"/>



    </div>
  }
}

export default SuccessPage
