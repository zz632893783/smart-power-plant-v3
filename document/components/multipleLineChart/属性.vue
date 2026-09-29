<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2026-9-29 11:48:47 -->
<template>
    <div class="border-t border-l">
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">属性名</div>
                <div class="p-4 border-r border-b text-sm">说明</div>
                <div class="p-4 border-r border-b text-sm">类型</div>
                <div class="p-4 border-r border-b text-sm">默认值</div>
                <div class="p-4 border-r border-b text-sm">参考值</div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    legendIcon
                </div>
                <div class="p-4 border-r border-b text-sm">
                    图表项图标样式 'line'，'circle' 两种
                </div>
                <div class="p-4 border-r border-b text-sm">
                    String
                </div>
                <div class="p-4 border-r border-b text-sm">
                    'line'
                </div>
                <div class="p-4 border-r border-b text-sm">
                    'line'
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    legendNames
                </div>
                <div class="p-4 border-r border-b text-sm">
                    图表项名称
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['实时负荷', '出清负荷']
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    color
                </div>
                <div class="p-4 border-r border-b text-sm">
                    图表项颜色
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['rgba(246, 189, 22, 1)', 'rgba(232, 104, 74, 1)']
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['blue', 'grey']
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    xAxisData
                </div>
                <div class="p-4 border-r border-b text-sm">
                    x 轴de坐标
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    seriesData
                </div>
                <div class="p-4 border-r border-b text-sm">
                    系列数据，可用 yAxisIndex 指定该条折线对应的 y 轴（从 0 开始）
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ data: [120, 132, 101, 134, 190, 230, 218], yAxisIndex: 0 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ data: [110, 118, 122, 130, 145, 150, 148], yAxisIndex: 1 }<br/>]
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    grid
                </div>
                <div class="p-4 border-r border-b text-sm">
                    上下左右边距
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Object
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ({ top: 20, left: 30, right: 20, bottom: 50 })
                </div>
                <div class="p-4 border-r border-b text-sm">
                    { top: 84, right: 18, bottom: 56, left: 56 }
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    units
                </div>
                <div class="p-4 border-r border-b text-sm">
                    各 y 轴对应的单位（用于 tooltip 数值，按下标与 y 轴对应）
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['MW', '℃']
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    markLine
                </div>
                <div class="p-4 border-r border-b text-sm">
                    标记线
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 134,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yAxisIndex: 0,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: '#33FFBB'<br/>&nbsp;&nbsp;&nbsp;&nbsp;},<br/>&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 166,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yAxisIndex: 0,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: '#F74768'<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>]
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    smooth
                </div>
                <div class="p-4 border-r border-b text-sm">
                    是否平滑
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Boolean, Number
                </div>
                <div class="p-4 border-r border-b text-sm">
                    false
                </div>
                <div class="p-4 border-r border-b text-sm">
                    true
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    xAxisHighlightArea
                </div>
                <div class="p-4 border-r border-b text-sm">
                    高亮区域的索引
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    []
                </div>
                <div class="p-4 border-r border-b text-sm">
                    [2, 4]
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    xAxisHighlightAreaColor
                </div>
                <div class="p-4 border-r border-b text-sm">
                    高亮区域的索引
                </div>
                <div class="p-4 border-r border-b text-sm">
                    String
                </div>
                <div class="p-4 border-r border-b text-sm">
                    'rgb(253, 226, 226)'
                </div>
                <div class="p-4 border-r border-b text-sm">
                    [2, 4]
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    yAxisName
                </div>
                <div class="p-4 border-r border-b text-sm">
                    各 y 轴的名称（显示在坐标轴旁，按下标与 y 轴对应）
                </div>
                <div class="p-4 border-r border-b text-sm">
                    String, Array
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['']
                </div>
                <div class="p-4 border-r border-b text-sm">
                    ['负荷(MW)', '温度(℃)']
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    scale
                </div>
                <div class="p-4 border-r border-b text-sm">
                    图表缩放比例
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Number
                </div>
                <div class="p-4 border-r border-b text-sm">
                    1
                </div>
                <div class="p-4 border-r border-b text-sm">
                    2
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    beforeSetOption
                </div>
                <div class="p-4 border-r border-b text-sm">
                    万能方法，图表渲染之前执行
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Function
                </div>
                <div class="p-4 border-r border-b text-sm">
                    null
                </div>
                <div class="p-4 border-r border-b text-sm">
                    function (option, chart) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>}
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="p-4 border-r border-b text-sm">
                    afterSetOption
                </div>
                <div class="p-4 border-r border-b text-sm">
                    万能方法，图表渲染之后执行
                </div>
                <div class="p-4 border-r border-b text-sm">
                    Function
                </div>
                <div class="p-4 border-r border-b text-sm">
                    null
                </div>
                <div class="p-4 border-r border-b text-sm">
                    function (option, chart) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>}
                </div>
            </div>
    </div>
</template>