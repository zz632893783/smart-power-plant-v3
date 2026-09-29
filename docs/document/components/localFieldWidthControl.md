## 1.基础用法

<div class="demo-scope"><demofa7ff70dd3b0 /></div>

```vue{4}
<template>
    <local-field-width-control
        ref="fieldControlRef"
        unique-name="uniqueName"
        v-model="visibleFieldProps"
        :options="columns.map(column => ({
            prop: column.prop,
            label: column.label,
            width: visibleFieldProps?.find(n => n.prop === column.prop)?.width || column.width,
            minWidth: visibleFieldProps?.find(n => n.prop === column.prop)?.minWidth || column.minWidth
        }))"
    />
    <div class="border p-4 mt-4">
        {{ visibleFieldProps }}
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

// 显示字段
const visibleFieldProps = ref([]);
// 组件实例
const fieldControlRef = ref(null);
// 所有列
const columns = [
    { prop: 'order', label: '序号', width: 60 },
    { prop: 'nodeType', label: '节点类型', width: 90 },
    { prop: 'state', label: '状态', width: 120 },
    { prop: 'kksCode', label: '位号', width: 220 }
];

onMounted(() => {
    // 查询本页面之前是否对显示字段做缓存
    visibleFieldProps.value = fieldControlRef.value.getProps();
});
</script>

```
## 属性

<div class="demo-scope"><demo179ed814fccf /></div>

<script setup>
import demofa7ff70dd3b0 from '../../../document/components/localFieldWidthControl/1.基础用法.vue'
import demo179ed814fccf from '../../../document/components/localFieldWidthControl/属性.vue'
</script>