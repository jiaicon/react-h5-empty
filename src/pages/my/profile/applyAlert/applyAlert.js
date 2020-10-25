/**
 * Created by jxt on 2018/4/17.
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './applyAlert.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Introduce extends React.Component {

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

    componentWillUnmount() { }

    render() {
      const { t } = this.props;
        const content = window.orgInfo.org_service_guide;
        const tel = window.orgInfo.org_service_tel;
        return (
            <div>
                <div
                    className="page-introduce-style" dangerouslySetInnerHTML={{
                        __html: content ?
                            content.replace(/(\n+)/g, '<br/>') : `${t('请联系客服电话')}:<a href="tel:${tel}"/>${tel}</a>`
                    }}
                />
                

            </div>

        );
    }

}


Introduce.title = i18next.t('申请修改信息');

Introduce.propTypes = {
};

export default connect(
    state => state.my || {},
    dispatch => bindActionCreators({}, dispatch),
)(translate('translations')(Introduce));
