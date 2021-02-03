import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18next from 'i18next';
import { translate } from 'react-i18next';
import { requestPracticeBaseInfo } from './index.store'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/lib/wing-blank/style/css';

class PracticeBaseDetailPage extends React.Component {

    componentWillMount() {
        this.props.requestPracticeBaseInfo(this.props.route.params && this.props.route.params.id || null);
    }

    render() {
        console.info(this.props);
        const { detail: { data: detailData }, t } = this.props;

        const subTitles = [
            {
                title: '基地名称',
                content: detailData && detailData.name || '',
            },
            {
                title: '基地类型',
                content: detailData && detailData.category && detailData.category.name || '',
            },
            {
                title: '地址',
                content: detailData && detailData.address || '',
            },
            {
                title: '联系人',
                content: detailData && detailData.contacts || '',
            },
            {
                title: '联系电话',
                content: detailData && detailData.phone || '',
            },
        ];
        return <div>
            <img src={detailData && detailData.base_url} style={{ width: '100vw', height: '48VW', display: 'block' }} />
            <div style={{ background: 'white', margin: '12px 0px' }}>
                {
                    subTitles.map(v => {
                        return <div style={{ display: 'flex', paddingTop: 12, paddingBottom: 12, borderBottom: '0.5px solid #EBEDF0', color: 'rgba(0,0,0,0.85)', fontSize: 14 }}>
                            <div style={{ marginLeft: '3.4vw', width: '24vw', minWidth:'24vw' }}>{v.title}</div>
                            <div style={{paddingRight: '3.4vw'}}>{v.content}</div>
                        </div>
                    })
                }
            </div>
            {
                detailData && detailData.desc && detailData.desc.length ? <div style={{ background: 'white', padding: '12px 3.4vw' }}>
                    <div style={{ paddingBottom: 12, color: 'rgba(0,0,0,0.85)', fontSize: 15 }}>{t('基地介绍')}</div>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: detailData.desc
                                ? detailData.desc.replace(/(\n+)/g, "<br/>")
                                : t('暂无介绍')
                        }}
                    />
                </div> : null
            }
            <a style={{ color: 'white', lineHeight: '44px', fontSize: 14, height: 44, width: '100%', background: '#6AC6F8', textAlign: 'center', position: 'fixed', bottom: 0 }} href={`tel:${detailData && detailData.phone}`}>
                立即预约
            </a>
        </div >
    }
}


PracticeBaseDetailPage.title = i18next.t("基地详情");

export default connect(
    state => ({
        detail: state.practiceBase.detail,
    }),
    dispatch =>
        bindActionCreators(
            {
                requestPracticeBaseInfo,
            },
            dispatch
        )
)(translate('translations')(PracticeBaseDetailPage));