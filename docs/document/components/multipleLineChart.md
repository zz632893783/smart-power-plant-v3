## 1.基础用法

<div class="demo-scope"><demo91462efcd103 /></div>

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

<div class="demo-scope"><demo8692f772ecb1 /></div>

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

<div class="demo-scope"><demo148a00317511 /></div>

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

<div class="demo-scope"><demof3fc3f86158d /></div>

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

<div class="demo-scope"><demo5d14f67b2c2e /></div>

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

<div class="demo-scope"><demo9ce5832da5a9 /></div>

```vue{4}
<template>
    <multiple-line-chart class="h-[340px]" ref="chartRef" v-bind="chartOption" />
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    grid: { top: 84, right: 56, bottom: 56, left: 56 },
    legendNames: ['实时负荷', '出清负荷'],
    yAxisNames: ['实时负荷', '出清负荷'],
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

<div class="demo-scope"><demo1b20cb5ea393 /></div>

<script setup>
import demo91462efcd103 from '../../../document/components/multipleLineChart/1.基础用法.vue'
import demo8692f772ecb1 from '../../../document/components/multipleLineChart/2.圆形legend样式.vue'
import demo148a00317511 from '../../../document/components/multipleLineChart/3.颜色设置.vue'
import demof3fc3f86158d from '../../../document/components/multipleLineChart/4.标记线.vue'
import demo5d14f67b2c2e from '../../../document/components/multipleLineChart/5.部分区域高亮.vue'
import demo9ce5832da5a9 from '../../../document/components/multipleLineChart/6.y轴线名称和双y轴.vue'
import demo1b20cb5ea393 from '../../../document/components/multipleLineChart/属性.vue'
</script>