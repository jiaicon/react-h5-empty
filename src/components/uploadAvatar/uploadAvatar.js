import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import { Toast} from 'antd-mobile';
import uploadImage from './../../utils/uploadImage';
import 'antd-mobile/lib/toast/style/css'
import './uploadAvatar.css';

function loadingToast(options) {
    Toast.loading(options.loading || 'Loading...', options.time || 0, (callback) => {
        console.log('Load complete !!!');
        options.callback&&typeof options.callback === 'function'&&options.callback();
    });
}

class UploadAvatar extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state={
            avatar: null
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
    }
    onPhotoChange(e) {
        uploadImage(`/api/imgupload`, {method: 'POST', data: {file: {file: e.target.files[0]}}}).then((json) => {
            if (json.error_code === 0) {
                this.props.onChange(json.data.url);
                this.setState({
                    avatar: json.data.url
                })
            }
        });
    }
    render() {
        return (
            <div className="uploadAvatar" style={{...this.props.style}}>
                <div className="page-profile-header-uploade-box-div">
                    <div className="page-profile-header-uploade-box-iptbox">
                        <input onChange={this.onPhotoChange} accept="image/png, image/jpeg, image/jpg"
                               ref={c => {
                                   this.image = c
                               }} className="page-profile-header-uploade-box-ipt" type="file"/>
                    </div>
                    <div className="page-profile-header-uploade-box-img"
                         style={{backgroundImage: `url(${this.state.avatar ? this.state.avatar : (this.props.avatar ? this.props.avatar : '/images/my/register.png')})`}}></div>
                </div>
            </div>
        )
    }
}

UploadAvatar.propTypes = {};

export default UploadAvatar;
