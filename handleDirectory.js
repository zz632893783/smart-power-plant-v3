import fs from 'fs';

// 读取 根路径 './document/components' 目录下的组件文件夹
let paths = fs.readdirSync('./document/components');

// 组件文件夹
const componentFolders = paths.filter(path => fs.statSync(`${ './document/components' }/${ path }`).isDirectory());
// 组件文件夹目录
const componentDirectory = componentFolders.map(folder => {
    // 某种图表目录下，示例文件的路径
    const examples = fs.readdirSync(`${ './document/components' }/${ folder }`);
    if (!examples.length) {
        return false;
    }
    return {
        name: folder,
        children: examples.map(n => ({ name: n }))
    };
});

// 读取 根路径 './document/sections' 目录下的模块文件夹
paths = fs.readdirSync('./document/sections');
// 模块文件夹
const sectionFolders = paths.filter(path => fs.statSync(`${ './document/sections' }/${ path }`).isDirectory());
// 模块文件夹目录
const sectionDirectory = sectionFolders.map(folder => {
    // 某种图表目录下，示例文件的路径
    const examples = fs.readdirSync(`${ './document/sections' }/${ folder }`);
    if (!examples.length) {
        return false;
    }
    return {
        name: folder,
        children: examples.map(n => ({ name: n }))
    };
});

const docsConfigStr = `
import { SearchPlugin  } from 'vitepress-plugin-search'
import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
    title: 'smart-power-plant-v3',
    description: '智能电厂组件库',
    // base: '/smart-power-plant-v3',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '快速开始', link: '/install' }
        ],
        sidebar: [
            {
                text: '快速开始',
                items: [
                    { text: '安装', link: '/install' }
                ]
            },
            {
                text: '组件',
                items: [
                    ${ componentDirectory.map(n => `{ text: '${ n.name }', link: '/document/components/${ n.name }' }`).join(',') }
                ]
            },
            {
                text: '模块',
                items: [
                    ${ sectionDirectory.map(n => `{ text: '${ n.name }', link: '/document/sections/${ n.name }' }`).join(',') }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/zz632893783/smart-power-plant-v3' }
        ]
    },
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            host: '0.0.0.0',
            port: 9999
        },
        plugins: [
            SearchPlugin({
                encode: false,
                tokenize: 'full',
                previewLength: 62,
                buttonLabel: 'Search',
                placeholder: 'Search docs',
                allow: [],
                ignore: ['demo'],
            })
        ]
    }
})

`;

fs.writeFileSync(`./docs/.vitepress/config.js`, docsConfigStr);
!fs.existsSync('./docs/document') && fs.mkdirSync('./docs/document');
// 清空文档目录
fs.existsSync('./docs/document/components') && fs.rmSync('./docs/document/components/', { recursive: true, force: true });
fs.existsSync('./docs/document/sections') && fs.rmSync('./docs/document/sections/', { recursive: true, force: true });
// 如果目录不存在，则创建目录
!fs.existsSync('./docs/document/components') && fs.mkdirSync('./docs/document/components');
!fs.existsSync('./docs/document/sections') && fs.mkdirSync('./docs/document/sections');

// 组件目录处理
componentDirectory.forEach(item => {
    const contents = item.children.map(n => {
        // 随机计算一个组件名，确保不重复
        const demoName = `demo${ new Array(12).fill().map(() => Math.floor(Math.random() * 16).toString(16)).join('') }`;
        const content = [
            // 锚点标题
            `## ${ n.name.replace(/\.[a-zA-Z\d]+$/, '') }`,
            '',
            // 引入组件（外面包一层 .demo-scope，用于把 demo 与文档正文排版隔离开）
            // 前后各留一个空行：markdown 中 <div> 是块级 HTML，会一直吞到空行为止，
            // 不留空行会把紧随其后的代码块一起吞进去，导致 Vue 编译报 Invalid end tag
            `<div class="demo-scope"><${ demoName } /></div>`,
            ''
        ];
        // 以"1.xxxx"这样命名的组件，认为是组件使用例子，需显示代码
        // 否则只渲染组件，不显示组件代码
        /^\d+\./.test(n.name) && content.push(
            // 代码起始标志
            '```vue{4}',
            // 例子代码
            fs.readFileSync(`./document/components/${ item.name }/${ n.name }`).toString(),
            // 代码结束标志
            '```'
        );
        return {
            demoName,
            path: `../../../document/components/${ item.name }/${ n.name }`,
            content: content.join('\n')
        };
    });
    const readmeContent = [
        ...contents.map(n => n.content),
        '<script setup>',
        ...contents.map(n => `import ${ n.demoName } from '${ n.path }'`),
        '</script>'
    ].join('\n');
    fs.writeFileSync(`./docs/document/components/${ item.name }.md`, readmeContent);
});

// 模块目录处理
sectionDirectory.forEach(item => {
    const contents = item.children.map(n => {
        // 随机计算一个组件名，确保不重复
        const demoName = `demo${ new Array(12).fill().map(() => Math.floor(Math.random() * 16).toString(16)).join('') }`;
        const content = [
            // 锚点标题
            `## ${ n.name.replace(/\.[a-zA-Z\d]+$/, '') }`,
            '',
            // 引入组件（外面包一层 .demo-scope，用于把 demo 与文档正文排版隔离开）
            // 前后各留一个空行：markdown 中 <div> 是块级 HTML，会一直吞到空行为止，
            // 不留空行会把紧随其后的代码块一起吞进去，导致 Vue 编译报 Invalid end tag
            `<div class="demo-scope"><${ demoName } /></div>`,
            ''
        ];
        // 以"1.xxxx"这样命名的组件，认为是组件使用例子，需显示代码
        // 否则只渲染组件，不显示组件代码
        /^\d+\./.test(n.name) && content.push(
            // 代码起始标志
            '```vue{4}',
            // 例子代码
            fs.readFileSync(`./document/sections/${ item.name }/${ n.name }`).toString(),
            // 代码结束标志
            '```'
        );
        return {
            demoName,
            path: `../../../document/sections/${ item.name }/${ n.name }`,
            content: content.join('\n')
        };
    });
    const readmeContent = [
        ...contents.map(n => n.content),
        '<script setup>',
        ...contents.map(n => `import ${ n.demoName } from '${ n.path }'`),
        '</script>'
    ].join('\n');
    fs.writeFileSync(`./docs/document/sections/${ item.name }.md`, readmeContent);
});
