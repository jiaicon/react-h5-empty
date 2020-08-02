const SERVER_HOST = 'https://api.flashdiet.cn';

export const HOST = SERVER_HOST;

// 线上接口
export const API_PREFIX = `${window.apiHost}/api/v1` || 'http://alpha.api.volunteer.tmallwo.com:8000/api/v1';
export const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com:8000';
export const ADMIN_HOST = (`${window.apiHost}` == 'https://api.volzdx.cn') || (`${window.apiHost}` == 'https://api.volzdx.cn' )? 'https://admin.volzdx.cn' : 'http://admin.volunteer.guangying.link';
// http://api.volzdx.cn


export const people = [
    { id: "01", name: "汉族" },
    { id: "02", name: "蒙古族" },
    { id: "03", name: "回族" },
    { id: "04", name: "藏族" },
    { id: "05", name: "维吾尔族" },
    { id: "06", name: "苗族" },
    { id: "07", name: "彝族" },
    { id: "08", name: "壮族" },
    { id: "09", name: "布依族" },
    { id: "10", name: "朝鲜族" },
    { id: "11", name: "满族" },
    { id: "12", name: "侗族" },
    { id: "13", name: "瑶族" },
    { id: "14", name: "白族" },
    { id: "15", name: "土家族" },
    { id: "16", name: "哈尼族" },
    { id: "17", name: "哈萨克族" },
    { id: "18", name: "傣族" },
    { id: "19", name: "黎族" },
    { id: "20", name: "傈僳族" },
    { id: "21", name: "佤族" },
    { id: "22", name: "畲族" },
    { id: "23", name: "高山族" },
    { id: "24", name: "拉祜族" },
    { id: "25", name: "水族" },
    { id: "26", name: "东乡族" },
    { id: "27", name: "纳西族" },
    { id: "28", name: "景颇族" },
    { id: "29", name: "柯尔克孜族" },
    { id: "30", name: "土族" },
    { id: "31", name: "达斡尔族" },
    { id: "32", name: "仫佬族" },
    { id: "33", name: "羌族" },
    { id: "34", name: "布朗族" },
    { id: "35", name: "撒拉族" },
    { id: "36", name: "毛难族" },
    { id: "37", name: "仡佬族" },
    { id: "38", name: "锡伯族" },
    { id: "39", name: "阿昌族" },
    { id: "40", name: "普米族" },
    { id: "41", name: "塔吉克族" },
    { id: "42", name: "怒族" },
    { id: "43", name: "乌孜别克族" },
    { id: "44", name: "俄罗斯族" },
    { id: "45", name: "鄂温克族" },
    { id: "46", name: "崩龙族" },
    { id: "47", name: "保安族" },
    { id: "48", name: "裕固族" },
    { id: "49", name: "京族" },
    { id: "50", name: "塔塔尔族" },
    { id: "51", name: "独龙族" },
    { id: "52", name: "鄂伦春族" },
    { id: "53", name: "赫哲族" },
    { id: "54", name: "门巴族" },
    { id: "55", name: "珞巴族" },
    { id: "56", name: "基诺族" }
];


export const cardtype = [
    { id: "1", name: "内地居民身份证" },
    { id: "2", name: "香港居民身份证" },
    { id: "3", name: "澳门居民身份证" },
    { id: "4", name: "台湾居民身份证" },
    { id: "5", name: "护照" }
];