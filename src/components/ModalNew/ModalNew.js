/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './ModalNew.css';


class ModalNew extends React.Component {
    static propTypes = {}

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            children: [],
            ...props
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            ...nextProps
        })
    }

    componentWillUnmount() {
    }

    _closeModal() {
        if (!this.props.maskCloseable) {
            return;
        }
        if(typeof this.props.maskCloseable == 'function') {
            this.props.maskCloseable();
            return;
        }
        this.setState({
            visible: false
        })
    }
    _clearEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    renderChild() {
        const {children} = this.state;
        if(children && !Array.isArray(children)) {
            return children;
        }else {
            {this.state.children && this.state.children.length > 0 ? this.state.children.map((item)=>{
                return item
            }) : null}
        }
    }
    render() {
        return <div className={classnames({
            "visible": this.state.visible,
            "hidden": !this.state.visible,
            "modal-new": true
        })}>
            <div className="modal-new-mask"></div>
            <div className="modal-new-wrap" onClick={this._closeModal}>
                <div className="modal-new-wrap-container" onClick={this._clearEvent}>
                    <div className="modal-new-wrap-container-padding">
                        <div className="modal-new-wrap-container-title">{this.state.title}</div>
                        <div className="modal-new-wrap-container-content">
                            {this.renderChild()}
                        </div>
                        <div className="modal-new-wrap-container-footer">
                            {this.state.footer && this.state.footer.length > 0 ? this.state.footer.map((item)=>{
                              return <a onClick={item.onPress} className="modal-new-wrap-container-footer-item">
                                      {item.text}
                              </a>
                            }):null}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}


export default ModalNew;
