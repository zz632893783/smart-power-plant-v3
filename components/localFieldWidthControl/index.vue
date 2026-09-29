<!-- 本地-列表显示字段缓存组件，该版本会缓存字段 key 与 列宽信息 -->
<template>
    <div class="inline-block">
        <el-popover
            :trigger="trigger"
            :width="popoverWidth"
            :placement="placement"
        >
            <template #reference>
                <el-button type="primary">
                    <el-icon><Setting /></el-icon>
                </el-button>
            </template>
            <el-checkbox
                v-model="checkAll"
                @change="checkAllChange"
                :indeterminate="indeterminate"
            >
                全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedKeys" @change="changeSingleOption">
                <el-checkbox
                    :key="n.prop"
                    :value="n.prop"
                    v-for="n in options"
                >
                    {{ n.label }}
                </el-checkbox>
            </el-checkbox-group>
        </el-popover>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';

// 自定义方法
const emits = defineEmits(['update:modelValue']);

// 属性
const props = defineProps({
    /**
     * @description 悬浮框位置 'right'，'left'，'top'，'bottom' 四种
     * @example 'right'
     */
    placement: {
        type: [String],
        default: () => 'right'
    },
    /**
     * @description 悬浮框宽度
     * @example 350
     */
    popoverWidth: {
        type: [Number],
        default: () => 350
    },
    /**
     * @description 触发方式 'click'，'hover' 两种
     * @example 'click'
     */
    trigger: {
        type: [String],
        default: () => 'click'
    },
    /**
     * @description v-model 绑定值
     * @example []
     */
    modelValue: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 选项
     * @example []
     */
    options: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 唯一标识名
     * @example ''
     */
    uniqueName: {
        type: [String],
        default: () => ''
    }
});

// 是否全选
const checkAll = ref(false);
// 是否半选
const indeterminate = ref(false);
// 组件内部选中 keys
const checkedKeys = ref([]);

// 计算组件的半选状态
const computeIndeterminateState = () => {
    if (!checkedKeys.value?.length) {
        checkAll.value = indeterminate.value = false;
    } else {
        const v = props.options.every(n => checkedKeys.value.includes(n.prop));
        checkAll.value = v;
        indeterminate.value = !v;
    }
};

// 修改传入值
watch(() => props.modelValue, val => {
    checkedKeys.value = val?.map(n => n.prop);
    computeIndeterminateState();
}, { immediate: true });

// 获取保存在 localStorage 中，props.uniqueName 所对应的显示字段 prop 数组
const getProps = () => {
    let fieldWidthControlCache;
    try {
        fieldWidthControlCache = JSON.parse(window.localStorage.getItem('fieldWidthControlCache')) || {};
    }
    catch (e) {
        console.log(e);
        fieldWidthControlCache = {};
    }
    return fieldWidthControlCache[props.uniqueName] || props.options.map(n => ({ prop: n.prop, width: n.width, minWidth: n.minWidth }));
};

// 保存缓存字段 prop
const saveProps = () => {
    let fieldWidthControlCache;
    try {
        fieldWidthControlCache = JSON.parse(window.localStorage.getItem('fieldWidthControlCache')) || {};
    }
    catch (e) {
        console.log(e);
        fieldWidthControlCache = {};
    }
    fieldWidthControlCache[props.uniqueName] = props.options.filter(option => checkedKeys.value.includes(option.prop));
    window.localStorage.setItem('fieldWidthControlCache', JSON.stringify(fieldWidthControlCache));
};

const changeSingleOption = () => {
    computeIndeterminateState();
    emits('update:modelValue', props.options.filter(option => checkedKeys.value.includes(option.prop)));
    saveProps();
};

// 改变全选状态
const checkAllChange = val => {
    indeterminate.value = false;
    checkedKeys.value = val ? props.options.map(n => n.prop) : [];
    emits('update:modelValue', val ? props.options.map(n => ({ ...n })) : []);
    saveProps();
};

// 改变字段宽度
const changeFieldWidth = (prop, width) => {
    const option = props.options.find(n => n.prop === prop);
    if (option) {
        option.width = width;
        saveProps();
    }
};

// 暴露组件方法
defineExpose({ getProps, changeFieldWidth });
</script>
<style lang="scss" scoped></style>
