import Alert from 'react-s-alert';


const WXS = (option = {}) => {
    if (!window.wx) {
        return
    }
    let host = `${location.protocol}//${location.hostname}`;
    option = {
        title: `闪电轻体-${option.title || '最新最科学的减肥理念'}`,
        desc: option.desc || '美食吃饱，无需运动，长久健康！',
        link: `${host}${option.link||''}`,
        imgUrl: option.imgUrl || `${host}/images/icon.png`,
        success: () => Alert.success('分享成功')
    };

    [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
    ].forEach(share=>wx[share](option));
};

export default WXS;