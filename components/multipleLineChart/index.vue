<!-- 多条折线图组件 -->
<template>
    <div class="chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
// 默认上下左右空间
const defaultGrid = { top: 20, left: 30, right: 20, bottom: 50 };
// 属性
const props = defineProps({
    /**
     * @description 图表项图标样式 'line'，'circle' 两种
     * @example 'line'
     */
    legendIcon: {
        type: [String],
        default: () => 'line'
    },
    /**
     * @description 图表项名称
     * @example ['实时负荷', '出清负荷']
     */
    legendNames: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 图表项颜色
     * @example ['blue', 'grey']
     */
    color: {
        type: [Array],
        default: () => ['rgba(246, 189, 22, 1)', 'rgba(232, 104, 74, 1)']
    },
    /**
     * @description x 轴de坐标
     * @example ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
     */
    xAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 系列数据，可用 yAxisIndex 指定该条折线对应的 y 轴（从 0 开始）
     * @example [
     *     { data: [120, 132, 101, 134, 190, 230, 218], yAxisIndex: 0 },
     *     { data: [110, 118, 122, 130, 145, 150, 148], yAxisIndex: 1 }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({ top: 20, left: 30, right: 20, bottom: 50 })
    },
    /**
     * @description 各 y 轴对应的单位（用于 tooltip 数值，按下标与 y 轴对应）
     * @example ['MW', '℃']
     */
    units: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 标记线
     * @example [
     *     {
     *         value: 134,
     *         yAxisIndex: 0,
     *         color: '#33FFBB'
     *     },
     *     {
     *         value: 166,
     *         yAxisIndex: 0,
     *         color: '#F74768'
     *     }
     * ]
     */
    markLine: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 是否平滑
     * @example true
     */
    smooth: {
        type: [Boolean, Number],
        default: () => false
    },
    /**
     * @description 高亮区域的索引
     * @example [2, 4]
     */
    xAxisHighlightArea: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 高亮区域的颜色
     * @example 'rgba(253, 226, 226, 1)'
     */
    xAxisHighlightAreaColor: {
        type: [String],
        default: () => 'rgba(253, 226, 226, 1)'
    },
    /**
     * @description 各 y 轴的名称（显示在坐标轴旁，按下标与 y 轴对应）
     * @example ['负荷(MW)', '温度(℃)']
     */
    yAxisNames: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 图表缩放比例
     * @example 2
     */
    scale: {
        type: [Number],
        default: () => 1
    },
    /**
     * @description 万能方法，图表渲染之前执行
     * @example function (option, chart) {
     *     return '执行对 option 的修改，绑定自定义事件等'
     * }
     */
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    /**
     * @description 万能方法，图表渲染之后执行
     * @example function (option, chart) {
     *     return '执行对 option 的修改，绑定自定义事件等'
     * }
     */
    afterSetOption: {
        type: [Function],
        default: () => null
    }
});
// legend 图标映射
const legendIconMap = {
    // line: 'path://M0,15L8,15L8,8L24,8L24,15L32,15L32,17L22,17L22,10L10,10L10,17L0,17ZM8,17L8,24L24,24L24,17L22,17L22,22L10,22L10,17Z',
    line: 'path://M8,16A8,8,180,1,1,24,16A8,8,-180,1,1,8,16ZM0,15L32,15L32,17L0,17Z',
    bar: 'path://M8,8L24,8L24,24L8,24ZM0,0L32,32M32,0L0,32'
};
// 图表实例
let chart;
// 容器 ref
const chartRef = ref();
// 图表渲染函数
const renderChart = () => {
    if (chart?.dispose) {
        chart?.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);

    const grid = ['top', 'right', 'bottom', 'left'].reduce((x, k) => ({ ...x, [k]: props.grid[k] || defaultGrid[k] }), {});
    // 真实 y 轴数量：由 seriesData 中出现过的最大 yAxisIndex 推断（未指定则只有 1 个 y 轴）
    const seriesMaxYAxisIndex = props.seriesData.reduce((x, n) => Math.max(x, n.yAxisIndex || 0), 0);
    const yAxisCount = Math.max(1, seriesMaxYAxisIndex + 1);
    // 真实 y 轴：第 0 个在左侧，其余在右侧
    const yAxis = new Array(yAxisCount).fill().map((_, i) => ({
        type: 'value',
        position: i === 0 ? 'left' : 'right',
        offset: i >= 2 ? (i - 1) * 45 : 0,
        // 多轴时与上一个轴对齐刻度，保证网格线一致
        alignTicks: i > 0,
        name: props.yAxisNames[i] || '',
        nameTextStyle: { fontSize: 14, fontWeight: 400 },
        splitNumber: 4,
        // 只在第 0 个轴显示网格线，避免多轴重复
        splitLine: {
            show: i === 0,
            lineStyle: {
                width: 0.5
            }
        },
        axisLabel: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 12
        }
    }));
    // 末尾追加一个隐藏 y 轴，仅用于绘制区域高亮的背景条
    // 固定为 [0, 1] 区间，高亮条取值 1，保证无论其他轴如何缩放都能铺满绘图区
    yAxis.push({
        type: 'value',
        min: 0,
        max: 1,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
    });
    const option = {
        grid,
        legend: {
            show: true,
            bottom: 0,
            type: 'scroll',
            icon: {
                line: 'path://M0,0L6,0L6,1L0,1z',
                circle: 'circle'
            }[props.legendIcon],
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 17
                // color: 'rgba(255, 255, 255, 1)'
            },
            pageTextStyle: {
                color: 'white',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                /* eslint-disable */
                return `
                    <div style="background-color: transparent; padding: ${ 8 * props.scale }px; border-radius: 0; border: ${ 1 * props.scale }px solid rgba(102, 255, 255, 0);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #333; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 4 * props.scale }px; grid-template-columns: ${ 16 * props.scale }px min-content min-content; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.slice(0, params.length - 1).map((n, i) => {
                                    // const colorName = props.color[n.seriesIndex % props.color.length];
                                    // const colors = props.tooltipColors || props.itemColors;
                                    // const color = colors[n.seriesIndex % colors.length];
                                    const color = props.color[i % props.color.length];
                                    // tooltip 单位按该条折线所属的 y 轴取 units 中对应下标的单位
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = props.units[yAxisIndex] || '';
                                    const svgPath = legendIconMap.line.replace('path://', '').replace(/(?<!(a|A)(-?\d+(\.\d+)?,){3,4})-?\d+(\.\d+)?/g, s => s * props.scale);
                                    return `
                                        <i style="height: ${ 16 * props.scale }px; position: relative; overflow: hidden;">
                                            <svg viewbox="0 0 ${ 32 * props.scale } ${ 32 * props.scale }" width="${ 16 * props.scale }" height="${ 16 * props.scale }" style="filter: drop-shadow(${ 16 * props.scale }px 0 0 ${ color }); margin-left: ${ -16 * props.scale }px; position: absolute; top: 0; left: 0;">
                                                <path d="${ svgPath }"></path>
                                            </svg>
                                        </i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #333; font-weight: 400; grid-column-start: 3; margin-left: ${ 6 * props.scale }px; display: ${ n.seriesName ? 'block' : 'none' };">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #333; font-weight: 400; grid-column-start: 5; margin-left: ${ 6 * props.scale }px;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ unit }</label>
                                    `;
                                }).join('')
                            }
                        </div>
                    </div>
                `;
                /* eslint-disable */
            }
        },
        color: props.color,
        xAxis: [
            {
                type: 'category',
                data: props.xAxisData,
                axisLabel: {
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 15,
                    // color: 'rgba(255, 255, 255, 1)',
                    margin: 8
                },
                axisTick: {
                    alignWithLabel: true,
                    length: 4
                }
            },
            {
                type: 'category',
                data: props.xAxisData.map((n, i) => ''),
                axisTick: { show: false },
                // axisLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                axisLabel: { show: false }
            }
        ],
        yAxis,
        series: (() => {
            // 记录已挂载过标线的 y 轴，保证同一标线在同一个轴上只渲染一次
            const markLineAttachedAxes = new Set();
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const colorName = props.color[seriesIndex % props.color.length];
                // const type = seriesItem.type || 'bar';
                const seriesOption = {
                    type: 'line',
                    name: props.legendNames[seriesIndex % props.legendNames.length] || '',
                    data: seriesItem.data || [],
                    // 通过 yAxisIndex 指定该条折线对应的 y 轴（默认第 0 个）
                    yAxisIndex: seriesItem.yAxisIndex || 0
                };
                seriesOption.smooth = props.smooth;
                // seriesOption.symbol = 'circle';
                seriesOption.symbol = 'none';
                // seriesOption.symbolSize = 8 * props.scale;
                // seriesOption.itemStyle = {
                //     color: colorMap[colorName]?.line,
                //     width: 1 * props.scale
                // };
                // seriesOption.lineStyle = {
                //     color: colorMap[colorName]?.line,
                //     width: 1 * props.scale,
                //     type: seriesItem.lineType || 'solid'
                // };
                // seriesOption.label = {
                //     show: true,
                //     fontFamily: 'DINAlternate-Bold',
                //     fontSize: 16 * props.scale,
                //     color: colorMap[colorName]?.line,
                //     textShadowBlur: 4 * props.scale,
                //     textShadowOffsetX: 0,
                //     textShadowOffsetY: 2 * props.scale,
                //     textShadowColor: 'rgba(0, 0, 0, 0.50)',
                //     formatter: v => v.value
                // };
                // props.showLineArea && (seriesOption.areaStyle = {
                //     origin: 'start',
                //     color: colorMap[colorName]?.lineArea
                // });
                // 标线按 yAxisIndex 对齐到对应 y 轴，且每个轴上只挂载一次
                if (!markLineAttachedAxes.has(seriesOption.yAxisIndex)) {
                    const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === seriesOption.yAxisIndex);
                    if (markLines.length) {
                        markLineAttachedAxes.add(seriesOption.yAxisIndex);
                        seriesOption.markLine = {
                            symbol: 'none',
                            silent: true,
                            data: markLines.map(n => ({
                                yAxis: n.value,
                                lineStyle: { color: n.color, type: n.type }
                            })),
                            label: { show: false }
                        };
                    }
                }
                return seriesOption;
            });
            series.push({
                type: 'bar',
                barWidth: '100%',
                barGap: 0,
                // 高亮背景条使用末尾追加的隐藏 y 轴
                yAxisIndex: yAxisCount,
                xAxisIndex: 1,
                showBackground: false,
                label: { show: false },
                data: props.xAxisData.map((n, i) => ({
                    // 隐藏轴固定为 [0, 1]，取值 1 即可铺满绘图区高度
                    value: 1,
                    itemStyle: {
                        // color: props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent'
                        color: props.xAxisHighlightArea.includes(i) ? props.xAxisHighlightAreaColor : 'transparent'
                    },
                    emphasis: {
                        itemStyle: {
                            color: props.xAxisHighlightArea.includes(i) ? props.xAxisHighlightAreaColor : 'transparent'
                        }
                    }
                })),
                animation: false
            });
            return series;
        })()
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

const disposeChart = () => {
    chart?.dispose();
    chart = null;
};

// 暴露方法
defineExpose({ renderChart, disposeChart });
</script>
