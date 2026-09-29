// 根据注释自动生成属性文档脚本
import fs from 'fs';

!fs.existsSync('./document') && fs.mkdirSync('./document');

['components', 'sections'].forEach(directory => {
    // 读取目录下的所有组件文件夹（每个组件位于 {name}/index.vue）
    const names = fs.readdirSync(`./${ directory }`)
        .filter(path => fs.statSync(`./${ directory }/${ path }`).isDirectory())
        .filter(path => fs.existsSync(`./${ directory }/${ path }/index.vue`));

    names.forEach(name => {
        try {
            // 将组件解析为文本
            const content = fs.readFileSync(`./${ directory }/${ name }/index.vue`).toString();
            // 匹配组件文件中的特殊字符串 /* @attribute-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 3fr); */
            // let attributeTemplateColumns = content.match(/(?<=\/\* *@attribute-template-columns: *)[\w\W]+?(?=;? *\*\/)/);
            // attributeTemplateColumns = (attributeTemplateColumns ? attributeTemplateColumns[0] : 'minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr)').trim();
            // 匹配组件文件中的特殊字符串 /* @method-template-columns: minmax(0, 1.5fr) minmax(0, 3fr) minmax(0, 4.5fr); */
            // let methodTemplateColumns = content.match(/(?<=\/\* *@attribute-template-columns: *)[\w\W]+?(?=;? *\*\/)/);
            // methodTemplateColumns = (methodTemplateColumns ? methodTemplateColumns[0] : 'minmax(0, 1.5fr) minmax(0, 3fr) minmax(0, 4.5fr)').trim();
            // 匹配组件中的属性
            const match = content.match(/(?<=defineProps\(\{[\w\W]+?\/\*\*)[\w\W]+?\*\/[^:]+?([a-zA-Z\d]+):[\w\W]+?type: ?\[?([a-zA-Z\d, ]+)\]?[\w\W]+?default: ?[\w\W]+?\n {4}\}/g);
            // 遍历所有属性
            const rows = match.map(attr => {
                // 获取注释中的属性描述字段
                let [description] = attr.match(/(?<=@description ?)[\w\W]+?(?=\* @example)/);
                description = description.replace(/( +)\*/g, '');
                // 获取注释中的组件参考值字段
                let [example] = attr.match(/(?<=@example ?)[\w\W]+?(?= {4}\*\/)/);
                example = example.replace(/( +)\*/g, '');
                // 获取组件中的属性名字段（兼容 LF / CRLF 两种换行符）
                const [attrName] = attr.match(/(?<=\*\/[\w\W]*?\n {4})[a-zA-Z\d]+?(?=:)/);
                // 获取组件中的属性类型字段
                const [type] = attr.match(/(?<=\*\/[\w\W]+?type: ?\[?)[a-zA-Z\d, ]+(?=\]?,)/);
                // 获取组件中的属性默认值字段
                const [defaultValue] = attr.match(/(?<=\*\/[\w\W]+?default: ?\(\) ? =>)[\w\W]+(?=\})/);
                // 字段包装为对象
                return { attrName, description, type, defaultValue, example };
            });
            const now = new Date();
            // 写入内容暂存数组
            const writeContent = [
                `<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->`,
                `<!-- 创建时间 ${ now.getFullYear() }-${ now.getMonth() + 1 }-${ now.getDate() } ${ now.getHours() }:${ now.getMinutes() }:${ now.getSeconds() } -->`,
                '<template>',
                '    <div class="border-t border-l">',
            `            <div class="grid grid-cols-5">`,
            '                <div class="p-4 border-r border-b text-sm">属性名</div>',
            '                <div class="p-4 border-r border-b text-sm">说明</div>',
            '                <div class="p-4 border-r border-b text-sm">类型</div>',
            '                <div class="p-4 border-r border-b text-sm">默认值</div>',
            '                <div class="p-4 border-r border-b text-sm">参考值</div>',
            '            </div>',
            ];
            rows.forEach(row => {
                writeContent.push(`            <div class="grid grid-cols-5">`);
                // 遍历每个属性的属性名，说明，类型，默认值，参考值字段
                ['attrName', 'description', 'type', 'defaultValue', 'example'].forEach(key => {
                    writeContent.push('                <div class="p-4 border-r border-b text-sm">');
                    // 对单元格中内容缩进格式的处理
                    const cellContent = row[key].trim().replace(/\n( +)/g, (m, c) => `<br/>${ new Array(c.length - 1).fill('&nbsp;').join('') }`);
                    writeContent.push(`                    ${ cellContent }`);
                    writeContent.push('                </div>');
                });
                writeContent.push('            </div>');
            });
            writeContent.push('    </div>');
            writeContent.push('</template>');
            // writeContent.push('<style lang="scss" scoped>');
            // writeContent.push('.table-row {');
            // writeContent.push(`    grid-template-columns: ${ attributeTemplateColumns };`);
            // writeContent.push('}');
            // writeContent.push('</style>');

            !fs.existsSync(`./document/${ directory }`) && fs.mkdirSync(`./document/${ directory }`);
            !fs.existsSync(`./document/${ directory }/${ name }`) && fs.mkdirSync(`./document/${ directory }/${ name }`);
            // 对应的目录下自动生成 "属性.vue" 文件
            fs.writeFileSync(`./document/${ directory }/${ name }/属性.vue`, writeContent.join('\n'));
        } catch (e) {}
    });
});
