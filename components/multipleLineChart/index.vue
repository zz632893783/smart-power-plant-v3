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
     * @description 系列数据
     * @example [
     *     [120, 132, 101, 134, 190, 230, 218],
     *     [110, 118, 122, 130, 145, 150, 148]
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
     * @description y轴单位
     * @example ['%', '千瓦时']
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
     * @description 高亮区域的索引
     * @example [2, 4]
     */
    xAxisHighlightAreaColor: {
        type: [String],
        default: () => 'rgb(253, 226, 226)'
    },
    /**
     * @description y轴单位
     * @example ['亿元', '%']
     */
    yAxisName: {
        type: [String, Array],
        default: () => ['']
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
    },
    min: {
        type: [Number],
        default: () => null
    },
    max: {
        type: [Number],
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
                                    const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName;
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
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
        yAxis: [
            {
                type: 'value',
                splitNumber: 4,
                splitLine: {
                    lineStyle: {
                        width: 0.5
                        // color: 'rgba(255, 255, 255, .5)'
                    }
                },
                axisLabel: {
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 12
                    // color: 'rgba(255, 255, 255, 1)'
                },
                min: props.min || null,
                max: props.max || null,
            },
            {
                type: 'value',
                alignTicks: true,
                min: props.min || null,
                max: props.max || null,
                axisLabel: { show: false },
                splitLine: { show: false }
            }
        ],
        series: (() => {
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const colorName = props.color[seriesIndex % props.color.length];
                // const type = seriesItem.type || 'bar';
                const seriesOption = {
                    type: 'line',
                    name: props.legendNames[seriesIndex % props.legendNames.length] || '',
                    data: seriesItem.data || [],
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
                const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === seriesOption.yAxisIndex);
                markLines.length && (seriesOption.markLine = {
                    symbol:'none',
                    silent: true,
                    data: markLines.map(n => ({
                        yAxis: n.value,
                        lineStyle: { color: n.color, type: n.type }
                    })),
                    label: { show: false }
                });
                return seriesOption;
            });
            series.push({
                type: 'bar',
                barWidth: '100%',
                barGap: 0,
                yAxisIndex: (typeof props.yAxisName === 'string' || (props.yAxisName instanceof Array && props.yAxisName.length === 1)) ? 1 : 2,
                xAxisIndex: 1,
                showBackground: false,
                label: { show: false },
                data: props.xAxisData.map((n, i) => ({
                    value: (() => {
                        if (![null, undefined, NaN, ''].includes(props.max)) {
                            return props.max;
                        }
                        const allValues = props.seriesData.reduce((x, y) => [...x, ...y.data], []);
                        return Math.max(...allValues);
                    })(),
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
