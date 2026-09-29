// 只将发布所需要的文件，存入一个临时的目录，减小发布模块的体积
import fs from 'fs';
const publishPath = './publishDir';
// 获取运行时携带的参数
const args = process.argv.splice(2);
// 判断是公网/私服发布
const publicPrivate = args[0];
// 是否需要自动添加一个版本号
const updateVersion = !!args[1];
// 清空文档目录
fs.existsSync(publishPath) && fs.rmSync(publishPath, { recursive: true, force: true });
// 如果目录不存在，则创建目录
fs.mkdirSync(publishPath);
// 创建工具文件夹（与项目目录保持一致）
!fs.existsSync(`${ publishPath }/utils`) && fs.mkdirSync(`${ publishPath }/utils`);
// 复制工具函数
fs.copyFileSync('./utils/index.js', `${ publishPath }/utils/index.js`);
// 创建请求文件夹（与项目目录保持一致）
!fs.existsSync(`${ publishPath }/request`) && fs.mkdirSync(`${ publishPath }/request`);
// 复制请求文件
fs.copyFileSync('./request/index.js', `${ publishPath }/request/index.js`);
fs.copyFileSync('./request/apiKeys.js', `${ publishPath }/request/apiKeys.js`);
// 创建字典文件夹（与项目目录保持一致）
!fs.existsSync(`${ publishPath }/dictionary`) && fs.mkdirSync(`${ publishPath }/dictionary`);
// 复制字典文件
fs.copyFileSync('./dictionary/index.js', `${ publishPath }/dictionary/index.js`);
// 复制地图组件用到的区划边界 json 文件
// fs.copyFileSync('./utils/china.json', `${ publishPath }/utils/china.json`);
// 每次自动将版本最后一位 + 1
const packageJsonContent = fs.readFileSync('./package.json').toString().replace(/(?<="version": *"\d+\.\d+\.)\d+(?=")/, c => (Number(c) + (updateVersion ? 1 : 0)).toString());
// 在发布目录下写入 package.json
fs.writeFileSync('./package.json', packageJsonContent);
// 发布包中的 packageJson
const publishPackageJson = JSON.parse(packageJsonContent);
// 删除无用 script
delete publishPackageJson.scripts;
delete publishPackageJson.devDependencies;
// 匹配 vue 版本
// const vueVersion = (publishPackageJson.dependencies.vue.match(/[^"]+/) || ['^3.3.4'])[0];
// 匹配 echarts 版本
const echartsVersion = (publishPackageJson.dependencies.echarts.match(/[^"]+/) || ['^5.5.0'])[0];
// 匹配 sass 版本
const sassVersion = (publishPackageJson.dependencies.sass.match(/[^"]+/) || ['^1.71.1'])[0];
// 重新指定 dependencies 中 vue, echarts, sass 版本
publishPackageJson.dependencies = {
    // vue: vueVersion,
    echarts: echartsVersion,
    sass: sassVersion
};
// 如果私服发布，则需要写入 publishConfig 字段
publicPrivate === 'private' && (publishPackageJson.publishConfig = { registry: 'http://10.10.120.191:8081/repository/npm-private/' });
// 生成打包所用的 package.json （只含有必要的 vue 与 echarts 这俩依赖）
fs.writeFileSync(`${ publishPath }/package.json`, JSON.stringify(publishPackageJson, null, 2));
// 将入口文件复制到发布目录
fs.copyFileSync('./index.js', `${ publishPath }/index.js`);
// 发布目录下，创建组件文件夹
fs.mkdirSync(`${ publishPath }/components`);
fs.mkdirSync(`${ publishPath }/sections`);
// 拿到 “根路径/components” 下的所有组件文件夹（每个组件位于 {name}/index.vue）
const components = fs.readdirSync('./components')
    .filter(path => fs.statSync(`./components/${ path }`).isDirectory())
    .filter(path => fs.existsSync(`./components/${ path }/index.vue`));
// 拿到 “根路径/sections” 下的所有组件文件夹（每个组件位于 {name}/index.vue）
const sections = fs.readdirSync('./sections')
    .filter(path => fs.statSync(`./sections/${ path }`).isDirectory())
    .filter(path => fs.existsSync(`./sections/${ path }/index.vue`));
// 将整个组件文件夹递归复制到 “发布目录/components” 中
// （一个组件可能由 {name} 文件夹下的多个文件共同组成，index.vue 只是对外入口）
components.forEach(name => {
    fs.cpSync(`./components/${ name }`, `${ publishPath }/components/${ name }`, {
        recursive: true,
        // 排除 macOS 生成的 .DS_Store
        filter: src => !src.endsWith('.DS_Store')
    });
});
// 将整个组件文件夹递归复制到 “发布目录/sections” 中
sections.forEach(name => {
    fs.cpSync(`./sections/${ name }`, `${ publishPath }/sections/${ name }`, {
        recursive: true,
        filter: src => !src.endsWith('.DS_Store')
    });
});
