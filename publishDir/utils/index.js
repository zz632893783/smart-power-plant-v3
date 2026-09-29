// import lodash from 'lodash';
// import CryptoJS from 'crypto-js';
// import router from '@/router/index.js';

// 重新登录
// export const loginAgain = lodash.throttle(() => {
//     window.localStorage.setItem('token', '');
//     import.meta.env.MODE === 'production'
//         ? (window.location.href = `${ import.meta.env.VITE_CAS_LOGIN_URL }?service=${ import.meta.env.VITE_BASE_WEB_URL }`)
//         : router.push({ path: '/login' });
// }, 200);

/**
 * 格式化时间
 * @param { Date|string|number } date - 可以是Date对象、时间戳或可被Date解析的字符串
 * @param { string } [format='YYYY-MM-DD HH:mm:ss'] - 格式字符串
 * @returns { string } 格式化后的时间字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    ['number', 'string'].includes(typeof date) && (date = new Date(date));
    // 非法日期格式
    if ([undefined].includes(date) || date.toString() === 'Invalid Date') {
        return '';
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const hours = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    const seconds = date.getSeconds().toString().padStart(2, 0);
    // 替换格式字符串中的占位符
    return format
        .replace(/YYYY/g, year)
        .replace(/MM/g, month)
        .replace(/M/g, date.getMonth() + 1)
        .replace(/DD/g, day)
        .replace(/D/g, date.getDate())
        .replace(/HH/g, hours)
        .replace(/H/g, date.getHours())
        .replace(/hh/g, (date.getHours() % 12 || 12).toString().padStart(2, 0))
        .replace(/h/g, date.getHours() % 12 || 12)
        .replace(/mm/g, minutes)
        .replace(/m/g, date.getMinutes())
        .replace(/ss/g, seconds)
        .replace(/s/g, date.getSeconds());
};

/**
 * 获取今天/本周/本月/本年 的时间戳
 * @param { string|number|Date|undefined } 可以是任意格式能被 new Date 解析的时间格式，也可以是 undefined (即认为是当前)，后续会根据 time 计算时间段
 * @param { string } 类型，day 今天; week 本周; week 本月; week 本年
 * @param { boolean } 是否完整，例如类型为 day 时，若 full 为 true，则最终计算结果为本日 00:00:00 - 本日 23:59:59，若 full 为 false，则最终计算结果为本日 00:00:00 - 此刻
 * @param { string } [format='YYYY-MM-DD HH:mm:ss'] - 格式字符串
 * @returns { array } 格式化后的起始/截止时间数组
 */
export const getTimestampRange = (time, type = 'day', full = false, format = 'YYYY-MM-DD HH:mm:ss') => {
    let start;
    let end;
    const date = time ? new Date(time) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // 日区间
    if (type === 'day') {
        start = new Date(year, month, day);
        end = full ? new Date(year, month, day, 23, 59, 59, 999) : date;
    }
    // 周区间
    else if (type === 'week') {
        const weekday = (date.getDay() + 6) % 7;
        start = new Date(year, month, day - weekday);
        end = full ? new Date(year, month, day - weekday + 6) : date;
    }
    // 月区间
    else if (type === 'month') {
        start = new Date(year, month);
        end = full ? new Date(year, month + 1, 0, 23, 59, 59, 999) : date;
    }
    // 年区间
    else if (type === 'year') {
        start = new Date(year, 0);
        end = full ? new Date(year, 11, 31, 23, 59, 59, 999) : date;
    }
    return [start, end].map(n => formatDate(n, format));
};

/**
 * 将颜色转化为 rgb 值
 * @param { string } 可以是任意格式颜色，如 'red', 'green', '#f00', '#0f0', '#ff0000', '#ffaa00', 'rgb(10, 20, 30)', 'rgba(10, 20, 30, 0.4)'
 * @returns { object } 计算得到的 rgba 值组成的对象
 */
export const transformColorToRGB = color => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1)?.data || [];
    // 计算得到的 rgba 值组成的对象
    return { r, g, b, a: a / 255 };
};

/**
 * 创建一个随机的 id
 * @param { number } group 分成多少组
 * @param { number } singleGroupLength 每组自身长度
 * @param { string } link 连接使用的字符串
 * @param { string } prepend 前置字符串
 * @param { string } append 后置字符串
 * @returns { string } 计算得到的 id 值
 */
export const createRandomId = (group = 4, singleGroupLength = 6, link = '-', prepend = '', append = '') => {
    const result = new Array(group)
        .fill()
        .map(() => Math.round(Math.random() * parseInt(`0x${ ''.padStart(singleGroupLength, 'f') }`, 16)).toString(16).padStart(singleGroupLength, 0));
    !['', null, undefined].includes(prepend) && result.unshift(prepend);
    !['', null, undefined].includes(append) && result.push(append);
    return result.join(link);
};


export const useColumnWidthCache = (uniqueName = '') => {
    let fieldWidthCache;
    try {
        fieldWidthCache = JSON.parse(window.localStorage.getItem('fieldWidthCache')) || {};
    }
    catch (err) {
        fieldWidthCache = {};
        console.log(err);
    }

    const getWidthCache = () => fieldWidthCache[uniqueName] || {};

    const setWidthCache = (prop, width) => {
        !(fieldWidthCache[uniqueName] instanceof Object) && (fieldWidthCache[uniqueName] = {});
        fieldWidthCache[uniqueName][prop] = width;
        window.localStorage.setItem('fieldWidthCache', JSON.stringify(fieldWidthCache));
    };
    return { getWidthCache, setWidthCache };
};

/**
 * 将秒转换为天时分秒的格式
 * @param { number } 秒数
 * @returns { string } 格式化后的起始/截止时间数组
 */
export const formatSeconds = (seconds) => {
    if (seconds < 60) {
        return `${ seconds }s`;
    }
    if (seconds < 60 * 60) {
        return `${ Math.floor(seconds / 60) }m${ seconds % 60 }s`;
    }
    if (seconds < 24 * 60 * 60) {
        return `${ Math.floor(seconds / 60 / 60) }h${ Math.floor(seconds % (60 * 60) / 60) }m${ seconds % 60 }s`;
    }
    return `${ Math.floor(seconds / 60 / 60 / 24) }d${ Math.floor(seconds % (60 * 60 * 24) / 60 / 60) }h${ Math.floor(seconds % (60 * 60) / 60) }m${ seconds % 60 }s`;
};

// 加密
// export const encryptionAES = (text = '', key = 'XinTianSecretKey', iv = 'XtYourInitVector') => {
//     const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
//         iv: CryptoJS.enc.Utf8.parse(iv),
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return encrypted.toString();
// };

// 解密
// export const decryptAES = (text = '', key = 'XinTianSecretKey', iv = 'XtYourInitVector') => {
//     const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
//         iv: CryptoJS.enc.Utf8.parse(iv),
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return decrypted.toString(CryptoJS.enc.Utf8);
// };
