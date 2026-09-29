<template>
    <div class="inline-block! relative!">
        <svg
            p-id="1792"
            class="icon"
            version="1.1"
            :width="size"
            :height="size"
            t="1751957306407"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path
                p-id="1793"
                fill="#EBECF0"
                d="M901.08928 925.3888a48.13824 48.13824 0 0 1-14.24896 34.38592 48.77312 48.77312 0 0 1-34.38592 14.24896H171.07456a48.13824 48.13824 0 0 1-34.3808-14.24896 48.74752 48.74752 0 0 1-14.24896-34.38592V49.42336a48.18944 48.18944 0 0 1 14.24896-34.40128A48.74752 48.74752 0 0 1 171.07456 0.77824h417.9968a48.5888 48.5888 0 0 1 34.59072 14.09024l263.3472 263.33184a48.68096 48.68096 0 0 1 14.08 34.59072z"
            ></path>
            <path
                p-id="1794"
                fill="#C1C7D0"
                d="M901.08928 925.3888v48.68608a48.18944 48.18944 0 0 1-14.24896 34.39616 48.77312 48.77312 0 0 1-34.38592 14.24896H171.07456a48.70656 48.70656 0 0 1-48.68096-48.69632v-48.63488a48.13824 48.13824 0 0 0 14.24384 34.38592 48.74752 48.74752 0 0 0 34.38592 14.24896h681.32864a48.81408 48.81408 0 0 0 48.68608-48.68608z"
            ></path>
            <path
                p-id="1796"
                :fill="currentConfig?.color?.[0]"
                d="M122.496 536.08448V438.71744L25.11872 536.08448z m778.59328 0l0.93184-97.36704 96.86016 97.36704z"
            ></path>
            <path
                p-id="1795"
                :fill="currentConfig?.color?.[1]"
                d="M25.11872 536.09472h973.24544v243.33824a48.81408 48.81408 0 0 1-48.61952 48.68096H73.81504a48.18944 48.18944 0 0 1-34.39616-14.24384 48.74752 48.74752 0 0 1-14.24896-34.38592z"
            ></path>
            <path d="M901.08928 312.73984v6.84032h-263.3216a48.6912 48.6912 0 0 1-48.6912-48.68096V0.72704a48.5888 48.5888 0 0 1 34.5856 14.09024l263.76192 263.22944a49.3312 49.3312 0 0 1 13.66528 34.69312z" fill="#C1C7D0" p-id="1797"></path>
        </svg>
        <div
            :style="formatStyle"
            class="absolute left-0 right-0 text-center font-bold text-white"
        >
            {{ currentConfig?.text }}
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

// 图标颜色文字映射
const formatMap = {
    docx: {
        color: ['#234AE8', '#317BFF'],
        text: 'WORD',
        fontSize: 20
    },
    doc: {
        color: ['#234AE8', '#317BFF'],
        text: 'WORD',
        fontSize: 20
    },
    xlsx: {
        color: ['#207245', '#33ad6e'],
        text: 'EXCEL',
        fontSize: 20
    },
    xls: {
        color: ['#207245', '#33ad6e'],
        text: 'EXCEL',
        fontSize: 20
    },
    ppt: {
        color: ['#cd4b29', '#f16c4e'],
        text: 'PPT',
        fontSize: 20
    },
    pptx: {
        color: ['#cd4b29', '#f16c4e'],
        text: 'PPTX',
        fontSize: 20
    },
    pdf: {
        color: ['#ff4242', '#ff6464'],
        text: 'PDF',
        fontSize: 20
    },
    jpg: {
        color: ['#207245', '#33ad6e'],
        text: 'JPG',
        fontSize: 20
    },
    jpeg: {
        color: ['#207245', '#33ad6e'],
        text: 'JPEG',
        fontSize: 20
    },
    png: {
        color: ['#207245', '#33ad6e'],
        text: 'PNG',
        fontSize: 20
    }
};

// 属性
const props = defineProps({
    /**
     * @description 图标格式
     * @example 'doc'
     */
    format: {
        type: [String],
        default: () => 'doc'
    },
    /**
     * @description 图标大小
     * @example 64
     */
    size: {
        type: [Number, String],
        default: () => 64
    }
});

// 对应选中的图标配置
const currentConfig = computed(() => {
    const format = props.format?.toLowerCase();
    const target = formatMap?.[format] || {};
    return target;
});

// 计算图标样式
const formatStyle = computed(() => {
    return {
        top: `${ props.size * 0.52 }px`,
        lineHeight: `${ props.size * 0.29 }px`,
        fontSize: `${ props.size * currentConfig?.value?.fontSize / 100 * 1 }px`
    };
});
</script>
<style lang="scss" scoped></style>
