<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    grid: { top: 84, right: 56, bottom: 56, left: 56 },
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54], yAxisIndex: 0 },
        { data: [95, 97, 75, 72, 90], yAxisIndex: 1 }
    ],
    units: ['MW', 'MW'],
    min: -20,
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>
