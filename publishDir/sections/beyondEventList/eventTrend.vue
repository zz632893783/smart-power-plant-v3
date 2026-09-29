<!-- 超温超压统计 > 越限事件列表统计 > 事件列表(趋势) -->
<template>
    <el-dialog
        overflow
        draggable
        width="1200px"
        v-model="visible"
        :close-on-click-modal="false"
        body-class="p-4"
        footer-class="border-t p-4 border-[#ebeef5]"
        header-class="border-b px-4 border-[#ebeef5] font-bold pb-0! h-12 flex items-center"
        class="px-0! py-0! [&_.el-dialog\_\_headerbtn]:flex! [&_.el-dialog\_\_headerbtn]:items-center! [&_.el-dialog\_\_headerbtn]:justify-center!"
        title="趋势"
    >
        <div class="grid grid-rows-[min-content_minmax(0,1fr)] h-140">
            <div class="grid pb-4 gap-4 grid-cols-[repeat(auto-fit,minmax(0,180px))]">
                <div class="grid items-center gap-4 grid-cols-[min-content_minmax(0,1fr)] col-span-4">
                    <label class="text-sm text-gray-600 whitespace-nowrap">
                        <el-radio-group
                            v-model="queryBody.timeType"
                            class="grid! grid-cols-[repeat(4,min-content)] [&_.el-radio]:mr-4!"
                            @change="getTrend()"
                        >
                            <el-radio value="today">当日</el-radio>
                            <el-radio value="near7days">近7日</el-radio>
                            <el-radio value="near30days">近30日</el-radio>
                            <el-radio value="customize">自定义</el-radio>
                        </el-radio-group>
                    </label>
                    <el-date-picker
                        :disabled="queryBody.timeType !== 'customize'"
                        v-model="queryBody.timeRange"
                        class="w-full!"
                        type="datetimerange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        range-separator="至"
                        @change="getTrend()"
                    />
                </div>
                <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                    <label class="text-sm text-gray-600 whitespace-nowrap">密度(点数)：</label>
                    <el-select
                        placeholder="请选择"
                        :empty-values="[undefined, null]"
                        v-model="queryBody.pointCount"
                        @change="getTrend()"
                    >
                        <el-option
                            v-for="n in [100, 200, 300, 400, 500, 800, 1000, 1500, 2000, 3000]"
                            :key="n"
                            :value="n"
                            :label="n"
                        />
                    </el-select>
                </div>
                <div class="flex">
                    <el-button type="primary" @click="getTrend()">查询</el-button>
                </div>
            </div>
            <multiple-line-chart v-bind="chartOption" ref="chartRef" />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="visible = false">关闭</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue';
import apiKeys from '../../request/apiKeys.js';
import { formatDate } from '../../utils/index.js';
import { postRequest } from '../../request/index.js';
import multipleLineChart from '../../components/multipleLineChart/index.vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
    /**
     * @description 接口 baseURL
     * @example 'http://192.168.10.100:8080/'
     */
    baseURL: {
        type: String,
        default: () => 'http://192.168.10.100:8080/'
    }
});

// 是否可见
const visible = ref(false);

// 图表实例
const chartRef = ref();

// 查询体
const queryBody = ref({
    timeType: 'customize',
    timeRange: [],
    pointCount: 100,
    indexKksCode: ''
});

// 预警开始/结束时间
const warningTimeRange = [];

// 趋势图配置
const chartOption = ref({
    grid: { left: 50, bottom: 65 },
    legendNames: [],
    xAxisData: [],
    color: ['#3FBE95', '#FF994D', '#FB628B', '#f00'],
    seriesData: [],
    units: [],
    markLine: [],
    xAxisHighlightArea: []
});

// 控制显隐
const getTrend = async row => {
    chartRef.value?.disposeChart();
    if (row) {
        // 现在查询时间段，确认过是当前选中这条记录，往前半小时，往后半小时
        queryBody.value.timeRange = [
            formatDate(new Date(row.startTime).getTime() - 30 * 60 * 1000),
            formatDate(new Date(row.endTime).getTime() + 30 * 60 * 1000)
        ];
        // 保存预警开始/结束时间
        warningTimeRange.value = [new Date(row.startTime).getTime(), new Date(row.endTime).getTime()];
        queryBody.value.indexKksCode = row.indexKksCode;
    }
    const requestBody = { ...queryBody.value };
    requestBody.timeRange?.length === 2 && ([requestBody.startTime, requestBody.endTime] = requestBody.timeRange.map(n => formatDate(n)));
    delete requestBody.timeRange;
    delete requestBody.timeType;

    // 响应结果
    const res = await postRequest(apiKeys.beyondEventStatistics.getBeyondEventStatisticsEventTrend, requestBody, props.baseURL);
    visible.value = true;
    const { hLimit, hhLimit, hhhLimit } = res?.data || {};
    const trendData = res?.data?.trendDTOList?.[0] || {};
    if (!trendData?.values?.length) {
        return ElMessage.warning('暂无数据');
    }
    chartOption.value.xAxisData = (trendData.values || []).map(n => formatDate(n.time, 'YYYY-MM-DD\nHH:mm:ss'));
    chartOption.value.units = [trendData?.unit || ''];
    chartOption.value.legendNames = [trendData?.kksDescription];
    chartOption.value.seriesData = [{ data: (trendData.values || []).map(n => n.value) }];
    // 需要标红的区域
    chartOption.value.xAxisHighlightArea = [];
    trendData.values.forEach(({ time }, index) => {
        // 预警开始/结束时间 内的区域标红
        time = new Date(time).getTime();
        time >= warningTimeRange.value[0] && time <= warningTimeRange.value[1] && chartOption.value.xAxisHighlightArea.push(index);
    });
    [hLimit, hhLimit, hhhLimit].forEach((limit, index) => {
        if (limit !== undefined) {
            chartOption.value.seriesData.push({ data: new Array(chartOption.value.xAxisData.length).fill(limit) });
            chartOption.value.legendNames.push(''.padStart(index + 1, 'H'));
            // 之前逻辑为，超过 limit 的区域标红，现在改为，传入 row 的 startTime 至 endTime 区域标红
            // (trendData.values || []).forEach((n, i) => n.value >= limit && xAxisHighlightArea.push(i));
        }
    });
    // chartOption.value.xAxisHighlightArea = Array.from(new Set(xAxisHighlightArea));
    await Promise.resolve();
    chartRef.value?.renderChart();
};

// 监听当月，计算时间区间
watch(() => queryBody.value.timeType, val => {
    let startTime = new Date();
    const endTime = new Date();
    val === 'today' && (startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()));
    val === 'near7days' && (startTime.setDate(startTime.getDate() - 7));
    val === 'near30days' && (startTime.setDate(startTime.getDate() - 30));
    queryBody.value.timeRange = [formatDate(startTime), formatDate(endTime)];
});

// 暴露组件方法
defineExpose({ getTrend });
</script>

