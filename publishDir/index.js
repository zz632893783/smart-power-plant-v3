// 运行 handleExport.js 会重新生成 index.js
import barChart from './components/barChart/index.vue';
import fileIcon from './components/fileIcon/index.vue';
import localFieldWidthControl from './components/localFieldWidthControl/index.vue';
import multipleLineChart from './components/multipleLineChart/index.vue';
import beyondEventList from './sections/beyondEventList/index.vue';

export { barChart, fileIcon, localFieldWidthControl, multipleLineChart, beyondEventList };

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
    // 判断是否可以安装
    if (install.installed) {
        return;
    }
    // 注册组件（此段代码由 handleExport.js 自动生成，运行 handleExport.js 会重新生成 index.js）
    Vue.component('barChart', barChart);
    Vue.component('bar-chart', barChart);
    Vue.component('fileIcon', fileIcon);
    Vue.component('file-icon', fileIcon);
    Vue.component('localFieldWidthControl', localFieldWidthControl);
    Vue.component('local-field-width-control', localFieldWidthControl);
    Vue.component('multipleLineChart', multipleLineChart);
    Vue.component('multiple-line-chart', multipleLineChart);
    Vue.component('beyondEventList', beyondEventList);
    Vue.component('beyond-event-list', beyondEventList);
};

export default { install, barChart, fileIcon, localFieldWidthControl, multipleLineChart, beyondEventList };