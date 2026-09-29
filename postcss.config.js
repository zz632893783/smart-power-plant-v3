import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

// 把 VitePress 主题的 CSS 整体包进 @layer vendor。
// 原因：这些样式原本是"未分层"的，而未分层样式的优先级恒高于任何 @layer 内的样式
//（与选择器特异性、书写先后都无关），会把 Tailwind v4 的 @layer 输出（preflight / 工具类）全部压住。
// 包进 vendor 后，再由 style/index.css 顶部的层序声明把它排在 base 之上、utilities 之下。
const wrapVitePressInVendorLayer = {
    postcssPlugin: 'wrap-vitepress-in-vendor-layer',
    OnceExit(root, { result }) {
        // 统一成 posix 分隔符，便于匹配
        const from = (result.opts.from || '').replace(/\\/g, '/');
        // 只处理来自 vitepress 包自身的 CSS。要同时兼容两种路径形态：
        //   dev  下 Vite 用符号链接路径：   .../node_modules/vitepress/dist/...
        //   build 下 Rollup 用 pnpm 真实路径：.../node_modules/.pnpm/vitepress@x/node_modules/vitepress/dist/...
        // 注意不能写成 /node_modules\/.*\/vitepress\//（要求中间再夹一段），否则 dev 路径匹配不上。
        if (!/(^|\/)node_modules\//.test(from) || !/(^|\/)vitepress\//.test(from)) return;

        const layer = postcss.atRule({ name: 'layer', params: 'vendor' });
        // 用 clone 逐个搬运，避免直接移动节点时的父子关系问题
        root.each(node => layer.append(node.clone()));
        root.removeAll();
        root.append(layer);
    },
};

export default {
    plugins: [
        // tailwind v4 的 postcss 插件（v3 的 autoprefixer 已内置在 v4 中，无需再配）
        // 注意：数组形式的插件列表只接受插件对象/函数，不能用字符串名
        tailwindcss(),
        wrapVitePressInVendorLayer,
    ],
};
