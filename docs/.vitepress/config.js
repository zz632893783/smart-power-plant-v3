
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
                    { text: 'barChart', link: '/document/components/barChart' },{ text: 'fileIcon', link: '/document/components/fileIcon' },{ text: 'localFieldWidthControl', link: '/document/components/localFieldWidthControl' },{ text: 'multipleLineChart', link: '/document/components/multipleLineChart' }
                ]
            },
            {
                text: '模块',
                items: [
                    { text: 'beyondEventList', link: '/document/sections/beyondEventList' }
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

