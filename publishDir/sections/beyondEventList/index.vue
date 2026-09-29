<template>
    <div class="grid grid-rows-[repeat(3,min-content)_minmax(0,1fr)_min-content] bg-white py-4">
        <h4 class="text-xl font-bold flex items-center h-7 px-4">
            <i class="w-1 h-4 mr-2 rounded-xs bg-[rgba(38,147,255,1)]"></i>
            事件列表
        </h4>
        <!-- 列表头部查询条件 -->
        <div class="grid mt-4 px-4 pb-4 gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b border-[#dcdfe6]">
            <div class="grid items-center gap-6 grid-cols-[min-content_minmax(0,1fr)] col-span-2">
                <label class="text-sm text-gray-600">
                    <el-radio-group v-model="queryBody.isThisMonth" class="grid! grid-cols-[min-content_min-content]">
                        <el-radio :value="true">当月</el-radio>
                        <el-radio :value="false">自定义</el-radio>
                    </el-radio-group>
                </label>
                <el-date-picker
                    :disabled="queryBody.isThisMonth"
                    v-model="queryBody.timeRange"
                    class="w-full!"
                    type="daterange"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="YYYY-MM-DD"
                    range-separator="至"
                    @change="getList(1)"
                    :clearable="false"
                />
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">车间：</label>
                <el-select
                    placeholder="请选择"
                    :empty-values="[undefined, null]"
                    v-model="queryBody.workshopKksCode"
                    @change="changeWorkshop"
                >
                    <el-option :value="''" label="全部" />
                    <el-option v-for="(n, i) in workshopOptions" :key="i" :value="n.kksCode" :label="n.nodeName" />
                </el-select>
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">专业：</label>
                <el-select
                    placeholder="请选择"
                    :empty-values="[undefined, null]"
                    v-model="queryBody.majorKksCode"
                    @change="changeMajor"
                >
                    <el-option :value="''" label="全部" />
                    <el-option v-for="(n, i) in majorOptions" :key="i" :value="n.kksCode" :label="n.nodeName" />
                </el-select>
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">工段：</label>
                <el-select
                    placeholder="请选择"
                    :empty-values="[undefined, null]"
                    v-model="queryBody.sectionKksCode"
                    @change="getList(1)"
                >
                    <el-option :value="''" label="全部" />
                    <el-option v-for="(n, i) in sectionOptions" :key="i" :value="n.kksCode" :label="n.nodeName" />
                </el-select>
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">类型：</label>
                <el-select
                    placeholder="请选择"
                    :empty-values="[undefined, null]"
                    v-model="queryBody.type"
                    @change="getList(1)"
                >
                    <el-option :value="''" label="全部" />
                    <el-option v-for="(n, i) in beyondEventTypeOptions" :key="i" :value="n.value" :label="n.label" />
                </el-select>
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">值次：</label>
                <el-select
                    placeholder="请选择"
                    :empty-values="[undefined, null]"
                    v-model="queryBody.className"
                    @change="getList(1)"
                >
                    <el-option :value="''" label="全部" />
                    <el-option v-for="(n, i) in valueTimesOptions" :key="i" :value="n" :label="n" />
                </el-select>
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">指标名称：</label>
                <el-input placeholder="请输入" v-model="queryBody.indexName" />
            </div>
            <div class="grid items-center gap-1 grid-cols-[min-content_minmax(0,1fr)]">
                <label class="text-sm text-gray-600 whitespace-nowrap">指标编码：</label>
                <el-input placeholder="请输入" v-model="queryBody.indexKksCode" />
            </div>
            <div class="flex">
                <el-button
                    type="primary"
                    @click="() => {
                        tableData.historyBtnVisible = true;
                        getList(1);
                    }"
                >
                    查询
                </el-button>
                <!-- <el-button @click="onReset">重置</el-button> -->
            </div>
        </div>
        <!-- 操作按钮栏 -->
        <div class="px-4 mt-4 flex items-center">
            <!-- 本地列表显示字段缓存组件，需指定 unique-name 用以标识 -->
            <local-field-width-control
                class="mr-3"
                ref="fieldControlRef"
                unique-name="beyondEventList"
                v-model="visibleFieldProps"
                :options="columns.map(column => ({
                    prop: column.prop,
                    label: column.label,
                    width: visibleFieldProps?.find(n => n.prop === column.prop)?.width || column.width,
                    minWidth: visibleFieldProps?.find(n => n.prop === column.prop)?.minWidth || column.minWidth
                }))"
            />
            <el-button type="primary" @click="exportRecords">
                <el-icon class="mr-1"><Download /></el-icon>导出
            </el-button>
            <el-button
                type="primary"
                v-if="!tableData.historyBtnVisible"
                @click="() => {
                    tableData.historyBtnVisible = true;
                    queryBody.indexKksCode = '';
                    getList(1);
                }"
            >
                <el-icon class="mr-1"><Back /></el-icon>返回
            </el-button>
        </div>
        <!-- 列表 -->
        <div class="grid grid-rows-1 mt-4 px-4">
            <el-table
                height="auto"
                :data="tableData.list"
                header-cell-class-name="!bg-[#f5f7fa]"
                border
                class="
                    before:hidden! after:hidden!
                    [&_.el-table\_\_border-left-patch]:hidden [&_.el-table\_\_inner-wrapper]:after:hidden
                    [&_thead_tr_th]:border-r-0! [&_tbody_tr_td]:border-r-0! [&_thead_tr_th_.cell]:relative
                    [&_thead_tr_th_.cell]:after:absolute [&_thead_tr_th_.cell]:after:right-0 [&_thead_tr_th_.cell]:after:top-1/2
                    [&_thead_tr_th_.cell]:after:-translate-y-1/2 [&_thead_tr_th_.cell]:after:h-4 [&_thead_tr_th_.cell]:after:w-px
                    [&_thead_tr_th_.cell]:after:bg-[#e4e7ed]! [&_thead_tr_th:nth-last-child(1)_.cell]:after:opacity-0
                "
                @header-dragend="(newWidth, oldWidth, column) => fieldControlRef.changeFieldWidth(column.property, newWidth)"
            >
                <!-- 列表字段 -->
                <el-table-column
                    :key="index"
                    :label="column.label"
                    :fixed="column.fixed"
                    show-overflow-tooltip
                    :min-width="column.minWidth"
                    :prop="column.prop"
                    :width="visibleFieldProps?.find(n => n.prop === column.prop)?.width || column.width"
                    v-for="(column, index) in columns.filter(item => visibleFieldProps?.find(n => n.prop === item.prop))"
                >
                    <template #default="scope">
                        {{
                            typeof column.handle === 'function'
                                ? column.handle(scope.row[column.prop])
                                : scope.row[column.prop]
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            @click="eventTrendRef.getTrend(scope.row)"
                        >
                            趋势
                        </el-button>
                        <el-button
                            link
                            type="primary"
                            @click="reasonDialogRef.show(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            link
                            type="primary"
                            v-if="tableData.historyBtnVisible"
                            @click="viewRecordHistory(scope.row)"
                        >
                            记录
                        </el-button>
                    </template>
                </el-table-column>
                <template #empty><el-empty :image-size="128" /></template>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="whitespace-nowrap px-4 grid gap-4 justify-end items-center grid-cols-[min-content_min-content] mt-4">
            <span class="text-sm">共{{ tableData.total }}条</span>
            <el-pagination
                background
                v-model:page-size="queryBody.limit"
                :page-sizes="[20, 50, 100]"
                layout="sizes, prev, pager, next"
                :total="tableData.total"
                @change="n => getList(n)"
                v-model:current-page="queryBody.page"
            />
        </div>
        <!-- 趋势 -->
        <event-trend ref="eventTrendRef" :baseURL="baseURL" />
        <!-- 编辑 -->
        <reason-dialog ref="reasonDialogRef" :baseURL="baseURL" />
    </div>
</template>
<script setup>
import lodash from 'lodash';
import eventTrend from './eventTrend.vue';
import apiKeys from '../../request/apiKeys.js';
import reasonDialog from './reasonDialog.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { formatDate, getTimestampRange } from '../../utils/index.js';
import { postRequest, getRequest, downloadRequest } from '../../request/index.js';
import { beyondEventTypeOptions, beyondEventTypeMap } from '../../dictionary/index.js';
import localFieldWidthControl from '../../components/localFieldWidthControl/index.vue';

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

// 列配置
const columns = [
    { prop: 'order', label: '序号', fixed: 'left', width: 60 },
    { prop: 'unitName', label: '车间', width: 130, defaultHide: false },
    { prop: 'indexKksCode', label: '指标编码', width: 220 },
    { prop: 'indexName', label: '指标名称', width: 250 },
    { prop: 'hLimit', label: '限值(一档)', width: 100 },
    { prop: 'startTime', label: '开始时间', width: 190, handle: v => formatDate(v) },
    { prop: 'firstDuration', label: '一档持续时间', width: 130, defaultHide: false },
    { prop: 'secondDuration', label: '二档持续时间', width: 130, defaultHide: true },
    { prop: 'thirdDuration', label: '三档持续时间', width: 130, defaultHide: true },
    { prop: 'sumDuration', label: '总持续时间', width: 130, hide: true },
    { prop: 'firstCount', label: '一档越线次数', width: 130, hide: true, defaultHide: false },
    { prop: 'secondCount', label: '二档越线次数', width: 130, hide: true, defaultHide: false },
    { prop: 'thirdCount', label: '三档越线次数', width: 130, hide: true, defaultHide: false },
    { prop: 'sumCount', label: '总次数', width: 130, hide: true },
    { prop: 'indexMaxValue', label: '最高值', width: 120 },
    { prop: 'className', label: '值次', width: 100 },
    { prop: 'exceedReason', label: '原因', width: 380 },
    { prop: 'updateAccountName', label: '最后修改人', width: 100 },
    { prop: 'unit', label: '单位', width: 100 },
    { prop: 'type', label: '类型', width: 100, handle: v => beyondEventTypeMap[v]?.label }
];
// 显示字段按钮
const fieldControlRef = ref();
// 显示字段 key
const visibleFieldProps = ref([]);

// 趋势图
const eventTrendRef = ref();

// 编辑
const reasonDialogRef = ref();

// 默认查询体
const defaultQueryBody = {
    // 车间
    workshopKksCode: '',
    // 专业
    majorKksCode: '',
    // 工段
    sectionKksCode: '',
    // 是否是当月
    isThisMonth: true,
    // 自定义时间区间的范围
    timeRange: [],
    // 类型
    type: '',
    // 值次
    className: '',
    // 指标名称
    indexName: '',
    // 指标编码
    indexKksCode: '',
    page: 1,
    limit: 20
};
// 查询体
const queryBody = ref(lodash.cloneDeep(defaultQueryBody));

// 分页/导出用计算的出的查询体
const pageExportRequestBody = computed(() => {
    const requestBody = {
        ...queryBody.value,
        unitKksCode: queryBody.value.sectionKksCode || queryBody.value.majorKksCode || queryBody.value.workshopKksCode
    };
    requestBody.timeRange?.length === 2 && ([requestBody.startDate, requestBody.endDate] = requestBody.timeRange.map(n => formatDate(n, 'YYYY-MM-DD')));
    delete requestBody.timeRange;
    delete requestBody.isThisMonth;
    delete requestBody.workshopKksCode;
    delete requestBody.majorKksCode;
    delete requestBody.sectionKksCode;
    return requestBody;
});

// 列表
const tableData = ref({
    list: [],
    total: 0,
    // 是否显示记录按钮
    historyBtnVisible: true
});
// 分页
const getList = (page = 1) => {
    tableData.value.list = [];
    queryBody.value.page = page;
    const url = apiKeys.beyondEventStatistics.getBeyondEventStatisticsEventList;
    postRequest(url, pageExportRequestBody.value, props.baseURL)
        .then(res => {
            const { list = [], totalCount = 0 } = res?.data || {};
            list.forEach((n, i) => {
                n.order = (queryBody.value.page - 1) * queryBody.value.limit + i + 1;
                n.machineName = `${ n.indexName.match(/(?<=#)\d+/)?.[0] }号机组`;
            });
            tableData.value.list = list;
            tableData.value.total = totalCount;
        });
};

// 监听当月，计算时间区间
watch(() => queryBody.value.isThisMonth, val => {
    val && (queryBody.value.timeRange = getTimestampRange(new Date(), 'month', true));
}, { immediate: true });

// 值次下拉
const valueTimesOptions = ref([]);
// 获取值次下拉
const getValueTimesOptions = () =>
    getRequest(apiKeys.beyondEventStatistics.getValueTimesOptions, undefined, props.baseURL)
        .then(res => valueTimesOptions.value = res?.data || []);

// 导出
const exportRecords = () => {
    const url = apiKeys.beyondEventStatistics.exportBeyondEventStatisticsEventList;
    downloadRequest(
        url,
        '导出结果.xlsx',
        pageExportRequestBody.value,
        'post',
        props.baseURL
    );
};

// 记录
const viewRecordHistory = row => {
    tableData.value.historyBtnVisible = false;
    const now = new Date();
    const start = new Date(now.getFullYear() - 1, now.getMonth());
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    queryBody.value.isThisMonth = false;
    queryBody.value.timeRange = [formatDate(start, 'YYYY-MM-DD'), formatDate(end, 'YYYY-MM-DD')];
    queryBody.value.indexKksCode = row.indexKksCode;
    getList(1);
};

// 获取某个节点的子节点
const getChildNodes = parentId =>
    getRequest(apiKeys.common.getNextChildAssetNodes, { parentId }, props.baseURL, undefined, false)
        .then(res => res?.data);

// 车间下拉
const workshopOptions = ref([]);
// 专业下拉
const majorOptions = ref([]);
// 工段下拉
const sectionOptions = ref([]);

// 车间下拉改变
const changeWorkshop = async () => {
    majorOptions.value = [];
    sectionOptions.value = [];
    queryBody.value.majorKksCode = queryBody.value.sectionKksCode = '';
    // 查询车间下拉
    if (queryBody.value.workshopKksCode) {
        // 查询专业下拉
        majorOptions.value = await getChildNodes(workshopOptions.value.find(n => n.kksCode === queryBody.value.workshopKksCode)?.idView);
    }
    getList(1);
};

// 专业下拉改变
const changeMajor = async () => {
    sectionOptions.value = [];
    queryBody.value.sectionKksCode = '';
    // 查询专业下拉
    if (queryBody.value.majorKksCode) {
        // 查询工段下拉
        sectionOptions.value = await getChildNodes(majorOptions.value.find(n => n.kksCode === queryBody.value.majorKksCode)?.idView);
    }
    getList(1);
};

// 初始化
onMounted(async () => {
    // 这里确保已经拿到资产树(可能其他页面有缓存过资产树，但是这里为了严谨，再调用一次取资产树的缓存)
    // await fixedDataStore.getTreeData();
    visibleFieldProps.value = fieldControlRef.value.getProps();
    // 获取值次下拉
    getValueTimesOptions();
    // 资产树根节点
    const rootNode = (await getChildNodes(null))[0];
    // 查询车间下拉
    workshopOptions.value = await getChildNodes(rootNode.idView);
    // 分页
    getList(1);
});
</script>
