import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './tag.css';

class Tab extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

    }
    renderInput() {
        return(
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">姓名</div>
                    <input type="text" ref={(c) => { this.realname = c; }} className="page-my-profile-verify-text" onChange={this.onTextChanged} />
                </div>
                <div className="line1px" />
            </div>
        )
    }
    render() {
        return(
            <div className="">
                {this.renderInput()}
            </div>
        )
    }

}