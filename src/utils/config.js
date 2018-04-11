const SERVER_HOST = 'https://api.flashdiet.cn';

export const HOST = SERVER_HOST;
// export const API_PREFIX = `${SERVER_HOST}/api/v1`
// export const API_PREFIX = 'https://api.github.com';
// export const API_PREFIX = 'https://www.easy-mock.com/mock/59ca36bee0dc663341bbe24a/smart';


// 测试接口
// export const API_PREFIX = 'http://alpha.api.volunteer.tmallwo.com:8000/api/v1';
// export const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com:8000';
// export const ADMIN_HOST = 'http://alpha.api.admin.volunteer.tmallwo.com:8000';
// http://alpha.api.volunteer.tmallwo.com:8000
// 'http://api.volunteerzhiduoxing.com
// 线上接口
export const API_PREFIX = `${window.apiHost}/api/v1` || 'http://alpha.api.volunteer.tmallwo.com:8000/api/v1';
export const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com:8000';
export const ADMIN_HOST = `${window.apiHost}` == 'http://api.volunteerzhiduoxing.com' ? 'http://admin.volunteerzhiduoxing.com' : 'http://alpha.api.admin.volunteer.tmallwo.com:8000';
