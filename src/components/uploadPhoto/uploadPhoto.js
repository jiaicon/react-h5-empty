import React, {PropTypes} from 'react';
import autoBind from 'react-autobind';
import {ImagePicker, Toast} from 'antd-mobile';
import uploadImage from './../../utils/uploadImage';
import 'antd-mobile/lib/image-picker/style/css'
import 'antd-mobile/lib/toast/style/css'
import './uploadPhoto.css';
function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });

}
function loadingToast(options) {
    Toast.loading(options.loading || 'Loading...', options.time || 0, (callback) => {
        console.log('Load complete !!!');
        options.callback&&typeof options.callback === 'function'&&options.callback();
    });
}

class UploadPhoto extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            files: [],
            multiple: false
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

    onChange = (files, type, index) => {
        if (type === 'remove') {
            this.props.onChange(files);
            this.setState({
                files,
            })
        }
        if (type === 'add') {
            const stateFiles = this.state.files;
            let arr = getArrDifference(files, stateFiles);
            if(!arr.length)return;
            this.uploadPhoto(arr, (serverImg) => {
                let files = this.state.files;
                files.push(serverImg);
                this.props.onChange(files);
                this.setState({
                    ...files
                })
            });
        }
    };

    uploadPhoto(imgArr, callback, index = 0) {
        loadingToast({
            loading: `上传中${index}/${imgArr.length}`
        });
        if (!imgArr.length) return;
        if(index >= imgArr.length-1){
            Toast.success('上传成功', 0.3);
            setTimeout(()=>{Toast.hide()}, 300)
        }
        if (index < imgArr.length) {
            uploadImage(`/api/imgupload`, {method: 'POST', data: {file: imgArr[index]}}).then((json) => {
                if (json.error_code === 0) {
                    index++;
                    callback(json.data);
                    this.uploadPhoto(imgArr, callback, index);
                }
            });

        }
    }
    onFail = () => {
        console.log('选择失败')
    };

    onAddImageClick(e) {
        console.log(e.target)
    }

    render() {
        const {files} = this.state;
        return (
            <div id={this.props.id || 'uploadPhone'} className="uploadPhone" style={{...this.props.style}}>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < (this.props.totle || 7)}
                    multiple={this.props.multiple || false}
                    onFail={this.onFail}
                    onAddImageClick={this.onAddImageClick}
                    length={this.props.length || 3}
                />
            </div>
        )
    }
}

UploadPhoto.propTypes = {};

export default UploadPhoto;
