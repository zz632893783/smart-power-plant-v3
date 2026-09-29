## 1.基础用法

<div class="demo-scope"><demof7d451b55361 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54] },
        { data: [95, 97, 75, 72, 90] }
    ],
    units: ['MW', 'MW']
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>

```
## 2.圆形legend样式

<div class="demo-scope"><demo6e75eb407eec /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendIcon: 'circle',
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54] },
        { data: [95, 97, 75, 72, 90] }
    ],
    units: ['MW', 'MW']
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>

```
## 3.颜色设置

<div class="demo-scope"><demo0da696037270 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54] },
        { data: [95, 97, 75, 72, 90] }
    ],
    units: ['MW', 'MW'],
    color: ['red', 'green']
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>

```
## 4.标记线

<div class="demo-scope"><demo121d97012516 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54] },
        { data: [95, 97, 75, 72, 90] }
    ],
    units: ['MW', 'MW'],
    markLine: [
        {
            value: 80,
            yAxisIndex: 0,
            color: 'red'
        }
    ]
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>

```
## 5.部分区域高亮

<div class="demo-scope"><demodfffb2ae78f7 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54] },
        { data: [95, 97, 75, 72, 90] }
    ],
    units: ['MW', 'MW'],
    xAxisHighlightArea: [1, 3],
    xAxisHighlightAreaColor: 'rgb(253, 226, 226)'
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>
```
## 6.y轴线名称和双y轴

<div class="demo-scope"><democ891efdace33 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendNames: ['实时负荷', '出清负荷'],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    seriesData: [
        { data: [54, 89, 86, 65, 54], yAxisIndex: 0 },
        { data: [95, 97, 75, 72, 90], yAxisIndex: 1 }
    ],
    units: ['MW', 'MW']
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped></style>

```
## 属性

<div class="demo-scope"><demo5ed0a7bfe8b8 /></div>

<script setup>
import demof7d451b55361 from '../../../document/components/multipleLineChart/1.基础用法.vue'
import demo6e75eb407eec from '../../../document/components/multipleLineChart/2.圆形legend样式.vue'
import demo0da696037270 from '../../../document/components/multipleLineChart/3.颜色设置.vue'
import demo121d97012516 from '../../../document/components/multipleLineChart/4.标记线.vue'
import demodfffb2ae78f7 from '../../../document/components/multipleLineChart/5.部分区域高亮.vue'
import democ891efdace33 from '../../../document/components/multipleLineChart/6.y轴线名称和双y轴.vue'
import demo5ed0a7bfe8b8 from '../../../document/components/multipleLineChart/属性.vue'
</script>