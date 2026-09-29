// 必须最先引入：里面的 @layer 层序声明要先于 VitePress 的样式出现才能生效
import '../../../style/index.css';
import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './custom.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

export default {
    ...DefaultTheme,
    NotFound: () => '404',
    enhanceApp: async ctx => {
        const { app } = ctx;
        // 注册图标
        Object.entries(ElementPlusIconsVue).forEach(([key, component]) => app.component(key, component));
        DefaultTheme.enhanceApp(ctx);
        app.use(ElementPlus, { locale: zhCn });
        const zrxChart = await import('../../../index.js');
        app.use(zrxChart.default);
    }
};
