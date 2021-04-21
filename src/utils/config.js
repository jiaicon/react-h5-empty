const SERVER_HOST = 'https://api.flashdiet.cn';

export const HOST = SERVER_HOST;

// 线上接口
export const API_PREFIX = `${window.apiHost}/api/v1` || 'http://alpha.api.volunteer.tmallwo.com:8000/api/v1';
export const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com:8000';
export const ADMIN_HOST = (`${window.apiHost}` == 'https://api.volzdx.cn') || (`${window.apiHost}` == 'https://api.volzdx.cn' )? 'https://admin.volzdx.cn' : 'http://admin.volunteer.guangying.link';
