/* eslint  "no-nested-ternary":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import './list.css';
import { isWindowReachBottom } from '../../utils/funcs';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import { Flex, WhiteSpace, Tabs } from 'antd-mobile';
import 'antd-mobile/lib/tabs/style/css';
import history from "../history";

import {
    requestPracticeBaseList,
    requestPracticeBaseCategoryList,
} from './index.store';

class PracticeBaseListPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {

        };
    }

    componentWillMount() {
        this.requestList(null);
        this.props.requestPracticeBaseCategoryList();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        // this.requestList(false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }



    handleScroll() {
        if (isWindowReachBottom(50)) {
            this.requestList(true);
        }
    }

    requestList(category_id) {
        const { list: { fetching } } = this.props;

        if (fetching) {
            return;
        }

        this.props.requestPracticeBaseList({
            category_id: category_id || null,
            page_size: 9999,
        });
    }


    render() {
        const {
            list: { data: listData },
            t,
            category: { data: categoryData }
        } = this.props;
        const showLoadingMore = listData &&
            listData.page && (listData.page.current_page < listData.page.total_page);

        return (
            <div>
                <div className="body">
                    <Tabs
                        initialPage={0}
                        onChange={(tab, index) => {
                            console.log('onChange', index, tab);
                            this.requestList(tab.id);
                        }}
                        tabs={categoryData && [{ title: '全部', id: null }, ...categoryData] || []}
                        renderTabBar={props => <Tabs.DefaultTabBar
                            {...props}
                            page={3}
                        />}
                    />

                    <div className="project-list">
                        {
                            listData && listData.list && listData.list.length ? listData.list.map(v => {
                                return <div style={{ background: 'white', marginTop: 12, marginBottom: 12 }} onClick={() => {
                                    history.push(`/practice_base/${v.id}`)
                                }}>
                                    <img src="http://api.volzdx.cn/images/uploads/2019-04/930121556591375.png" style={{ width: '93.6vw', height: '48VW', display: 'block', margin: '3.2vw', marginBottom: '1.6vw' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '3.2vw', marginBottom: '3.2vw', paddingBottom: '3.2vw', marginTop: '1.6vw' }}>
                                        <div>
                                            <div style={{ color: 'rgba(0,0,0,0.85)', fontSize: 18 }}>{v.name}</div>
                                            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12, marginTop: 4 }}>{v.address}</div>
                                        </div>
                                        <div style={{ background: '#6AC6F8', padding: '3px 12px', fontSize: 13, color: 'white' }}>预约</div>
                                    </div>
                                </div>
                            }) : <div className="component-loading-more">
                                    {t('暂无内容')}
                                </div>
                        }
                        {/* <Projects projects={listData ? listData.list : null} /> */}
                    </div>
                </div>
            </div>
        );
    }
}

PracticeBaseListPage.propTypes = {
    requestPracticeBaseList: PropTypes.func,
    list: PropTypes.shape({
        data: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({})),
            page: PropTypes.shape({
                current_page: PropTypes.number,
                total_page: PropTypes.number,
            }),
        }),
    }),
    route: PropTypes.shape({
        path: PropTypes.string,
        params: PropTypes.shape({
            type: PropTypes.string,
            category: PropTypes.string,
            target: PropTypes.string,
        }),
    }),
};

PracticeBaseListPage.title = i18next.t('实践基地');

export default connect(
    state => ({
        list: state.practiceBase.list,
        category: state.practiceBase.category,
    }),
    dispatch => bindActionCreators({
        requestPracticeBaseList,
        requestPracticeBaseCategoryList,
    }, dispatch),
)(translate('translations')(PracticeBaseListPage));
