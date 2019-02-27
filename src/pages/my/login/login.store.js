import {combineReducers} from 'redux';
import Alert from 'react-s-alert';
import fetch from '../../../utils/fetch';
import history from '../../history';
import {USERINFO_FULFILLED, USERINFO_CLEAR} from '../../../stores/common';
import {API_HOST} from '../../../utils/config';
import {setToken} from '../../../utils/funcs';


export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';

const STORE_LOGIN_SOURCE = 'STORE_LOGIN_SOURCE';


export const loginAction = data => (dispatch) => {
    dispatch({type: LOGIN_PENDING});

    fetch(`${data.type == 0 ?'/login/phone':'/login'}`, {
        data,
    }).then((json) => {
        window.token = data.token;
        if(json.token) {
            setToken(data.token);
        }
        dispatch({type: LOGIN_FULFILLED, payload: json.data});

        // 获取到用户信息后单独处理（存储 token/用户信息）
        dispatch({type: USERINFO_FULFILLED, payload: json});
    }).catch((e) => {
        console.log(e);
        dispatch({type: LOGIN_REJECTED});
    });
};

export const storeLoginSource = sourcePath => ({
    type: STORE_LOGIN_SOURCE,
    payload: {sourcePath},
});

export const logoutAction = () => (dispatch) => {
    dispatch({type: LOGOUT_PENDING});

    fetch('/logout', {
        method: 'GET',
    }).then((json) => {
        dispatch({type: LOGOUT_FULFILLED, payload: json.data});

        // 获取到用户信息后单独处理（存储 token/用户信息）
        dispatch({type: USERINFO_CLEAR, payload: json});

        if (json && !json.error_code) {
            window.location.replace('/');
            // history.replace('/');
        }
    }).catch((e) => {
        console.log(e);
        dispatch({type: LOGOUT_REJECTED});
    });
};

const loginReducer = (state = {
    fetching: false,
    failed: false,
    from: '',
    data: null,
    idx: 0,
}, action) => {
    switch (action.type) {
        case 'LOGIN_CHANGE_INDEX':
            return {
                ...state,
                idx: action.payload.idx
            };
        case LOGIN_PENDING:
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case LOGIN_FULFILLED:
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload,
            };
        case LOGIN_REJECTED:
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        case STORE_LOGIN_SOURCE:
            return {
                ...state,
                // 一定概率会定向到 /my/entry，临时处理，原因待查
                // from: action.payload.sourcePath === '/my/entry' ? '' : action.payload.sourcePath,
                from: action.payload.sourcePath,
            };
        default:
            return state;
    }
};

// 忘记密码，修改密码
export const forgetAction = data => ({
    type: 'FORGET',
    payload: fetch('/reset/pwd', {
        data,
        successWords: '修改成功',
    }),
});


const forgetReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
}, action) => {
    switch (action.type) {
        case 'FORGET_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'FORGET_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload,
            };
        case 'FORGET_REJECTED':
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        default:
            return state;
    }
};
// 获取验证码
export const againVerifyCode = data => ({
    type: 'CODE',
    payload: fetch(`${API_HOST}/api/phone/verifycode`, {
        data,
        successWords: '发送成功',
    }),
});


const againReducer = (state = {
    fetching: false,
    failed: false,
    data: null,
}, action) => {
    switch (action.type) {
        case 'CODE_PENDING':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'CODE_FULFILLED':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload,
            };
        case 'CODE_REJECTED':
            return {
                ...state,
                failed: true,
                fetching: false,
            };
        default:
            return state;
    }
};

export const changeIndex = (idx) => ({
    type: 'LOGIN_CHANGE_INDEX',
    payload: { idx  },
});
const reducer = combineReducers({
    forget: forgetReducer,
    login: loginReducer,
    code: againReducer,
});
export default reducer;

