import React, { PropTypes } from 'react';
import classnames from 'classnames';
import autoBind from 'react-autobind';
import './list_item.css';
import Image from '../../../../components/image/image'

const fundingType = [
    'fundingApplication_check@2x','fundingApplication_pass@2x','fundingApplication_reject@2x','fundingApplication_revoke@2x'
];
class ListItem extends React.Component {
    static propTypes = {

    };
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

    componentWillUnmount() {}
    checkoutThisApply(id) {
        location.href=`/funding_application/preview?isHasApply=${id}`;
    }
    render() {
        if(!this.props.data || !this.props.data.list || !this.props.data.list.length) {
            return <div style={{color: '#e3e3e3', textAlign: 'center', marginLeft: '-40px', fontSize: '13px'}}>暂无数据</div>
        }
        localStorage.setItem('applyData', JSON.stringify(this.props.data));
        return (
            <div>
                {
                    this.props.data.list.map((item, index)=><div key={index} className={
                        classnames({
                            'funding_mt': index>0
                        })
                    } style={{position: 'relative'}}
                    onClick={()=>{this.checkoutThisApply(item.id)}}
                    >
                        <div style={{paddingLeft: '35px'}}>
                            <div className="funding_project_name">{item.project_name}</div>
                            <div className="funding_org_name funding_org_pd">
                                <Image
                                    src="/images/preview/org_icon.png"
                                    style={{width: 21, height: 21, marginRight: 17}}
                                />
                                {item.group_name}
                            </div>
                            <div className="funding_org_name">
                                <Image
                                    src="/images/preview/money_icon.png"
                                    style={{width: 21, height: 21, marginRight: 17}}
                                />
                                {item.project_money}
                            </div>
                            <div className="funding-application-type" style={{backgroundImage: `url(/images/preview/${fundingType[item.status]}.png)`}}></div>
                        </div>
                        <div className="line1px" style={{marginTop: '33px'}}></div>
                    </div>)
                }
            </div>
        );
    }
}

export default ListItem;
