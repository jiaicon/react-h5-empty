import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import QRCode from "qrcode";


class Star extends React.Component {

    static propTypes = {
        size: PropTypes.shape({
            score: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        isBlockEmptyStar: PropTypes.bool,
        onChoose: PropTypes.func,
        url: PropTypes.string,
    }
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = ({
        });
    }
    componentWillReceiveProps(nextProps) {

        
    }
    componentDidMount() {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
    }
 
    render() {
        return (
            <div>11</div>
        );
    }
}

export default Star;
