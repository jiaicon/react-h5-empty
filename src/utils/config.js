const SERVER_HOST = 'https://api.flashdiet.cn';

export const HOST = SERVER_HOST;

// 线上接口
export const API_PREFIX = `${window.apiHost}/api/v1` || 'http://alpha.api.volunteer.tmallwo.com:8000/api/v1';
export const API_HOST = window.apiHost || 'http://alpha.api.volunteer.tmallwo.com:8000';
export const ADMIN_HOST = (`${window.apiHost}` == 'https://api.volzdx.cn') || (`${window.apiHost}` == 'https://api.volzdx.cn' )? 'https://admin.volzdx.cn' : 'http://admin.volunteer.guangying.link';
// http://api.volzdx.cn


export const people = [{ id: '01', name: '汉族', pinyin: 'Han' }, { id: '02', name: '蒙古族', pinyin: 'Mongolian' }, { id: '03', name: '回族', pinyin: 'Hui' },
  { id: '04', name: '藏族', pinyin: 'Tibetan' }, { id: '05', name: '维吾尔族', pinyin: 'Uyghur' }, { id: '06', name: '苗族', pinyin: 'Miao' },
  { id: '07', name: '彝族', pinyin: 'Yi' }, { id: '08', name: '壮族', pinyin: 'Zhuang' }, { id: '09', name: '布依族', pinyin: 'Buyei' },
  { id: '10', name: '朝鲜族', pinyin: 'Korean' }, { id: '11', name: '满族', pinyin: 'Manchu' }, { id: '12', name: '侗族', pinyin: 'Dong' },
  { id: '13', name: '瑶族', pinyin: 'Yao' }, { id: '14', name: '白族', pinyin: 'Bai' }, { id: '15', name: '土家族', pinyin: 'Tujia' },
  { id: '16', name: '哈尼族', pinyin: 'Hani' }, { id: '17', name: '哈萨克族', pinyin: 'Kazakh' }, { id: '18', name: '傣族', pinyin: 'Dai' },
  { id: '19', name: '黎族', pinyin: 'Li' }, { id: '20', name: '傈僳族', pinyin: 'Lisu' }, { id: '21', name: '佤族', pinyin: 'Va' },
  { id: '22', name: '畲族', pinyin: 'She' }, { id: '23', name: '高山族', pinyin: 'Gaoshan' }, { id: '24', name: '拉祜族', pinyin: 'Lahu' },
  { id: '25', name: '水族', pinyin: 'Shui' }, { id: '26', name: '东乡族', pinyin: 'Dongxiang' }, { id: '27', name: '纳西族', pinyin: 'Nakhi' },
  { id: '28', name: '景颇族', pinyin: 'Jingpo' }, { id: '29', name: '柯尔克孜族', pinyin: 'Kyrgyz' }, { id: '30', name: '土族', pinyin: 'Monguor' },
  { id: '31', name: '达斡尔族', pinyin: 'Daur' }, { id: '32', name: '仫佬族', pinyin: 'Mulao' }, { id: '33', name: '羌族', pinyin: 'Qiang' },
  { id: '34', name: '布朗族', pinyin: 'Blang' }, { id: '35', name: '撒拉族', pinyin: 'Salar' }, { id: '36', name: '毛难族', pinyin: 'Maonan' },
  { id: '37', name: '仡佬族', pinyin: 'Gelao' }, { id: '38', name: '锡伯族', pinyin: 'Xibe' }, { id: '39', name: '阿昌族', pinyin: 'Achang' },
  { id: '40', name: '普米族', pinyin: 'Pumi' }, { id: '41', name: '塔吉克族', pinyin: 'Tajik' }, { id: '42', name: '怒族', pinyin: 'Nu' },
  { id: '43', name: '乌孜别克族', pinyin: 'Uzbek' }, { id: '44', name: '俄罗斯族', pinyin: 'Russian' }, { id: '45', name: '鄂温克族', pinyin: 'Evenk' },
  { id: '46', name: '崩龙族', pinyin: 'Deang' }, { id: '47', name: '保安族', pinyin: 'Bonan' }, { id: '48', name: '裕固族', pinyin: 'Yughur' },
  { id: '49', name: '京族', pinyin: 'Kinh' }, { id: '50', name: '塔塔尔族', pinyin: 'Tatar' }, { id: '51', name: '独龙族', pinyin: 'Derung' },
  { id: '52', name: '鄂伦春族', pinyin: 'Oroqen' }, { id: '53', name: '赫哲族', pinyin: 'Nanai' }, { id: '54', name: '门巴族', pinyin: 'Monpa' },
  { id: '55', name: '珞巴族', pinyin: 'Lhoba' }, { id: '56', name: '基诺族', pinyin: 'Jino' }];

export const cardtype = [
    { id: "1", name: "内地居民身份证", en_US: 'PRC Resident Identity Card' },
    { id: "2", name: "香港居民身份证", en_US: 'Hong Kong Identity Card' },
    { id: "3", name: "澳门居民身份证", en_US: 'Macau Identity Card' },
    { id: "4", name: "台湾居民身份证", en_US: 'Taiwan Identity Card' },
    { id: "5", name: "护照", en_US: 'Passport' }
];