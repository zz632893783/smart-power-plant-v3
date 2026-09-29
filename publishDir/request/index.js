import axios from 'axios';
import lodash from 'lodash';
import objectHash from 'object-hash';
// import router from '@/router/index.js';
import { ElNotification, ElLoading } from 'element-plus';
// import { useCommonStore } from '@/store/common.js';
import { ref, watch } from 'vue';

// 当前未完成的请求数量（走封装通用 axios 对象请求数据，且传参中指定需要 loading 时）
const loading = ref(0);
// 加载中实例
let loadingInstance = null;
// 监听 loading 变化，更新加载中实例
watch(loading, val => {
    loadingInstance?.close();
    val > 0 && (loadingInstance = ElLoading.service({ lock: true, text: '加载中...', background: 'rgba(0, 0, 0, 0.35)' }));
});

// 重新登录
const loginAgain = () => {
    // window.localStorage.setItem('token', '');
    // router.push({ path: '/login' });
    // const commonStore = useCommonStore();
    // commonStore.cachedRoutes.value = [];
    // commonStore.clearUserInfo();
};

// 请求缓存对象
const responseCache = {};

// 请求实例
const request = axios.create({
    headers: {},
    timeout: 30 * 1000,
    baseURL: import.meta.env.VITE_API_BASE_URL
});

request.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

// 请求拦截器
const errorHandler = lodash.throttle(res => {
    const msg = res?.response?.data?.message || '';
    switch (res.status) {
        case 400:
            ElNotification.error(msg || '操作失败!');
            break;
        case 401:
            ElNotification.error(msg || '登陆超时,请重新登录!');
            // loginAgain();
            break;
        case 403:
            ElNotification.error(msg || '无请求权限!');
            // loginAgain();
            break;
        case 404:
            ElNotification.error(msg || '服务不存在');
            break;
        case 405:
            ElNotification.error(msg || '请求方式错误');
            break;
        case 500:
        case 503:
            ElNotification.error(msg || '网络错误!');
            break;
        default:
            ElNotification.error(msg || '网络错误!');
            break;
    }
}, 1500);

// 响应体处理
request.interceptors.response.use(
    (res) => {
        // 非 200 状态，直接认为请求失败，此时会走 axios 状态拦截器
        if (res?.status !== 200) {
            return Promise.reject(res.data);
        }
        if (res?.data?.code?.includes('02001')) {
            // 暂时先这样做
            return errorHandler({ status: 401 });
        }
        // 其实是后端问题，设计的某些请求是 200 状态，但是其实是失败的
        // 文件类型（Blob 与 ArrayBuffer）的请求，状态是 200 则认为是成功请求
        if (res?.data instanceof Blob || res?.data instanceof ArrayBuffer) {
            // 因为某些接口文件下载需要从头里面取文件名，但是又不想动原先已经联调好的页面返回结构，所以现在在 data 中多绑定一个字段
            res.data['content-disposition'] = res.headers['content-disposition'];
            return res.data;
        }
        // 普通请求则认为，需要状态 200 且 res?.data?.success 为 true 才认为是请求成功
        if (res?.data?.success) {
            return res.data;
        }
        ElNotification.error(res?.data?.msg || '操作失败!');
        return Promise.reject(res.data);
    },
    error =>
        errorHandler(error)
            ? Promise.reject(new Error(error))
            : Promise.reject(error)
);

/**
 * get 类型请求
 * @param { string } url 接口地址
 * @param { object } params 请求参数对象
 * @param { string } baseURL 请求服务地址
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @param { number } validDuration 请求成功后，本次请求的有效持续时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const getRequest = (
    url,
    params = {},
    baseURL,
    credential = true,
    needLoading = true,
    timeout = 30 * 1000,
    validDuration = 100
) => {
    // 某次请求参数生成的唯一 hash 值，用以区分请求是否相同
    const hash = objectHash({ type: 'getRequest', url, params, baseURL, credential });
    // 如果缓存中，已经存在了相同 hash 值，认为是相同请求，直接返回
    if (responseCache[hash]) {
        return responseCache[hash];
    }
    const requestConfig = { url, method: 'get', params };
    // 是否重写请求服务地址
    baseURL && (requestConfig.baseURL = baseURL);
    // 是否需要鉴权
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    // 请求超时时间
    requestConfig.timeout = timeout;
    // 是否需要全局 Loading
    needLoading && loading.value++;
    // 本次请求缓存
    responseCache[hash] = request(requestConfig)
        .then(res => {
            // 请求成功时，缓存持续时间结束后删除
            setTimeout(() => (delete responseCache[hash]), validDuration);
            return res;
        })
        .catch(err => {
            // 请求失败时：立即删除缓存，允许下次重试
            delete responseCache[hash];
            return Promise.reject(err);
        })
        .finally(() => (needLoading && loading.value--));
    return responseCache[hash];
};

/**
 * post 类型请求
 * @param { string } url 接口地址
 * @param { object } data 请求参数对象
 * @param { string } baseURL 请求服务地址
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } useGetFormat 是否使用 get 的形式拼接传参（后端的某些 post 请求，但是采用 get 方式接受参数，故增加此参数以做兼容）
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @param { number } validDuration 请求成功后，本次请求的有效持续时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const postRequest = (
    url,
    data = {},
    baseURL,
    credential = true,
    useGetFormat = false,
    needLoading = true,
    timeout = 30 * 1000,
    validDuration = 100
) => {
    // 某次请求参数生成的唯一 hash 值，用以区分请求是否相同
    const hash = objectHash({ type: 'postRequest', url, data, baseURL, credential, useGetFormat });
    // 如果缓存中，已经存在了相同 hash 值，认为是相同请求，直接返回
    if (responseCache[hash]) {
        return responseCache[hash];
    }
    // 后端使用 post 方式但是接受 get 形式传参，故加了下面这段，后续最好需要后端进行修改
    useGetFormat && (url = `${ url }?${ Object.keys(data).reduce((x, k) => [...x, `${ k }=${ data[k] }`], []).join('&') }`);
    const requestConfig = { url, method: 'post', data };
    // 是否重写请求服务地址
    baseURL && (requestConfig.baseURL = baseURL);
    // 是否需要鉴权
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    // 请求超时时间
    requestConfig.timeout = timeout;
    // 是否需要全局 Loading
    needLoading && loading.value++;
    // 本次请求缓存
    responseCache[hash] = request(requestConfig)
        .then(res => {
            // 请求成功时，缓存持续时间结束后删除
            setTimeout(() => (delete responseCache[hash]), validDuration);
            return res;
        })
        .catch(err => {
            // 请求失败时：立即删除缓存，允许下次重试
            delete responseCache[hash];
            return Promise.reject(err);
        })
        .finally(() => (needLoading && loading.value--));
    return responseCache[hash];
};

/**
 * 文件上传方法
 * @param { string } url 接口地址
 * @param { file } file 文件
 * @param { object } data 请求参数对象
 * @param { string } baseURL 请求服务地址
 * @param { boolean } credential 是否需要鉴权
 * @param { array } supportFormat 支持文件格式
 * @param { number } maxSize 文件大小限制 1 * 1024 表示 1KB, 10 * 1024 * 1024 表示 10MB 以此类推
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const uploadRequest = (
    url,
    file,
    data,
    baseURL,
    credential = true,
    supportFormat = ['.xls', '.xlsx'],
    maxSize = 200 * 1024 * 1024,
    needLoading = true,
    timeout = 30 * 1000
) => {
    const fileFormat = `.${file.name.split('.').pop().toLowerCase()}`;
    supportFormat = supportFormat.map((n) => n.toLowerCase());
    // 格式控制
    if (!supportFormat.includes(fileFormat)) {
        ElNotification.warning(`目前仅支持${ supportFormat.join(',') }格式文件`);
        return Promise.reject();
    }
    // 大小控制
    if (file.size > maxSize) {
        const val = Math.floor(Math.log2(maxSize) / 10);
        const unit = ['KB', 'MB', 'GB', 'TB'][val - 1];
        ElNotification.warning(`最大支持${ maxSize / Math.pow(1024, val).toFixed(2) }${ unit }的文件`);
        return Promise.reject();
    }
    const fd = new FormData();
    fd.append('file', file);
    for (const k in data) {
        fd.append(k, data[k]);
    }
    const requestConfig = {
        url,
        method: 'post',
        data: fd,
    };
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    return request(requestConfig).finally(() => needLoading && loading.value--);
};

/**
 * 文件批量上传方法
 * @param { string } url 接口地址
 * @param { files } files 文件数组
 * @param { object } data 请求参数对象
 * @param { string } baseURL 请求服务地址
 * @param { boolean } credential 是否需要鉴权
 * @param { array } supportFormat 支持文件格式
 * @param { number } maxSize 文件大小限制 1 * 1024 表示 1KB, 10 * 1024 * 1024 表示 10MB 以此类推
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const batchUploadRequest = (
    url,
    files,
    data,
    baseURL,
    credential = true,
    supportFormat = ['.xls', '.xlsx'],
    maxSize = 200 * 1024 * 1024,
    needLoading = true,
    timeout = 30 * 1000
) => {
    for (let i = 0; i < files.length; i++) {
        const fileFormat = `.${files[i].name.split('.').pop().toLowerCase()}`;
        supportFormat = supportFormat.map((n) => n.toLowerCase());
        // 格式控制
        if (!supportFormat.includes(fileFormat)) {
            ElNotification.warning(`目前仅支持${ supportFormat.join(',') }格式文件`);
            return Promise.reject();
        }
        // 大小控制
        if (files[i].size > maxSize) {
            const val = Math.floor(Math.log2(maxSize) / 10);
            const unit = ['KB', 'MB', 'GB', 'TB'][val - 1];
            ElNotification.warning(`最大支持${ maxSize / Math.pow(1024, val).toFixed(2) }${ unit }的文件`);
            return Promise.reject();
        }
    }
    const fd = new FormData();
    [...files].forEach((file) => fd.append('files', file));
    for (const k in data) {
        fd.append(k, data[k]);
    }
    const requestConfig = {
        url,
        method: 'post',
        data: fd,
    };
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    return request(requestConfig).finally(() => needLoading && loading.value--);
};

/**
 * 文件下载方法
 * @param { string } url 接口地址
 * @param { string } fileName 文件名
 * @param { object } requestBody 请求参数对象
 * @param { string } method 请求方式
 * @param { string } baseURL 请求服务地址
 * @param { boolean } useGetFormat 是否使用 get 的形式拼接传参（后端的某些 post 请求，但是采用 get 方式接受参数，故增加此参数以做兼容）
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { void }
 * */
export const downloadRequest = async (
    url,
    fileName = '',
    requestBody = {},
    method = 'get',
    baseURL,
    useGetFormat = false,
    credential = true,
    needLoading = true,
    timeout = 30 * 1000
) => {
    const requestConfig = { url, method, responseType: 'blob' };
    if (method?.toLocaleLowerCase() === "get" || useGetFormat) {
        requestConfig.params = requestBody;
    }
    else if (method?.toLocaleLowerCase() === 'post') {
        requestConfig.data = requestBody;
    }
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    // 创建下载
    const blobData = await request(requestConfig).finally(() => needLoading && loading.value--);
    // 如果没有指定文件名，则从 response 的 headers 中，拿到后端返回的文件描述
    if (!fileName) {
        // 接口返回结果会带文件名描述
        const contentDisposition = (blobData['content-disposition'] || '')
            .split(';')
            .filter((n) => !!n)
            .find((n) => /^fileName=/i.test(n));
        fileName = decodeURIComponent(
            contentDisposition.split(/=/)[1] || fileName
        );
    }
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([blobData]));
    downloadLink.style.display = 'none';
    downloadLink.setAttribute('target', '_blank');
    downloadLink.download = decodeURIComponent(fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
};

/**
 * 获取 ArrayBuffer 格式文件
 * @param { string } url 接口地址
 * @param { object } requestBody 请求参数对象
 * @param { string } method 请求方式
 * @param { string } baseURL 请求服务地址
 * @param { boolean } useGetFormat 是否使用 get 的形式拼接传参（后端的某些 post 请求，但是采用 get 方式接受参数，故增加此参数以做兼容）
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const getFileArrayBufferRequest = (
    url,
    requestBody = {},
    method = 'get',
    baseURL,
    useGetFormat = false,
    credential = true,
    needLoading = true,
    timeout = 30 * 1000
) => {
    const requestConfig = { url, method, responseType: 'arraybuffer' };
    if (method?.toLocaleLowerCase() === 'get' || useGetFormat) {
        requestConfig.params = requestBody;
    }
    else if (method?.toLocaleLowerCase() === 'post') {
        requestConfig.data = requestBody;
    }
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    return request(requestConfig).finally(() => needLoading && loading.value--);
};

/**
 * 获取 blob 格式文件
 * @param { string } url 接口地址
 * @param { object } requestBody 请求参数对象
 * @param { string } method 请求方式
 * @param { string } baseURL 请求服务地址
 * @param { boolean } useGetFormat 是否使用 get 的形式拼接传参（后端的某些 post 请求，但是采用 get 方式接受参数，故增加此参数以做兼容）
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { blob } 请求 Promise 对象，resolve 值为 blob 文件
 * */
export const getBlobFileRequest = (
    url,
    requestBody = {},
    method = 'get',
    baseURL,
    useGetFormat = false,
    credential = true,
    needLoading = true,
    timeout = 30 * 1000
) => {
    const requestConfig = { url, method, responseType: 'blob' };
    if (method?.toLocaleLowerCase() === 'get' || useGetFormat) {
        requestConfig.params = requestBody;
    }
    else if (method?.toLocaleLowerCase() === 'post') {
        requestConfig.data = requestBody;
    }
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    // 创建下载
    return request(requestConfig).finally(() => needLoading && loading.value--);
};

/**
 * post 类型请求，formData 格式传参
 * @param { string } url 接口地址
 * @param { object } data 请求参数对象
 * @param { string } baseURL 请求服务地址
 * @param { boolean } credential 是否需要鉴权
 * @param { boolean } needLoading 是否需要全局 loading（true 表示 store 中的 loading 会 +1）
 * @param { number } timeout 请求超时时间，毫秒为单位 1000 为代表 1秒
 * @returns { promise } 请求 Promise 对象
 * */
export const postFormDataRequest = (
    url,
    data = {},
    baseURL,
    credential = true,
    needLoading = true,
    timeout = 30 * 1000
) => {
    const fd = new FormData();
    for (const k in data) {
        fd.append(k, data[k]);
    }
    const requestConfig = {
        url,
        method: 'post',
        data: fd,
    };
    baseURL && (requestConfig.baseURL = baseURL);
    credential && (requestConfig.headers = { Authorization: window.localStorage.getItem('token') });
    requestConfig.timeout = timeout;
    needLoading && loading.value++;
    return request(requestConfig).finally(() => needLoading && loading.value--);
};
