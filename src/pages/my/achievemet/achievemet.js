import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import "./achievemet.css";

class Achievement extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {

        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(<div className="achievement">
            <div className="achievement-box">
                <div className="achievement-box-title">
                    <div>志愿成就</div>
                    <div>5/9</div>
                </div>
            </div>
        </div>)
    }
}


Achievement.propTypes = {

};

export default connect(
    state => ({
    }),
    dispatch => bindActionCreators({  }, dispatch),
)(Achievement);
