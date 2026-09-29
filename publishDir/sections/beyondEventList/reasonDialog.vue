<template>
    <el-dialog
        :close-on-click-modal="false"
        v-model="visible"
        title="超温原因编辑"
        width="600px"
        class="px-0!"
        body-class="p-4"
        footer-class="border-t px-4 border-[#ebeef5]"
        header-class="border-b px-4 border-[#ebeef5] font-bold"
    >
        <el-form
            :model="formData"
            ref="formRef"
            :rules="rules"
            class="grid grid-cols-1 gap-4"
            label-position="top"
        >
            <el-form-item prop="reason" label="原因">
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="5"
                    placeholder="请输入"
                    v-model="formData.reason"
                    maxlength="1024"
                    show-word-limit
                />
            </el-form-item>
            最后修改人：{{ updateAccountName }}
            最后修改时间：{{ updateTime }}
            <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,min-content))]">
                <div class="file grid gap-3" v-for="(n, i) in formData.fileList" :key="i">
                    <div class="borer-1 border-[rgba(220,223,230,1)] grid-rows-[min-content_min-content] w-30 h-30 rounded-sm grid relative content-center justify-center">
                        <file-icon :format="n.fileType || 'xlsx'" />
                        <el-icon
                            title="删除"
                            @click="removeFile(n)"
                            class="absolute bg-[rgba(196,196,196,1)] text-xl! top-2 right-2 cursor-pointer rounded-full"
                        >
                            <Close class="text-white" />
                        </el-icon>
                    </div>
                    <p class="text-center text-xlsm overflow-hidden whitespace-nowrap text-ellipsis">
                        {{ n?.fileName }}.{{ n?.fileType }}
                    </p>
                </div>
                <div class="file grid gap-3">
                    <div class="grid-rows-[min-content_min-content] bg-[rgba(230,241,252,1)] border border-[rgba(163,208,253,1)] text-[rgba(38,147,255,1)] w-30 h-30 rounded-sm relative">
                        <input class="absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer z-1" type="file" @change="beforeUpload" :accept="['.xlsx', '.docx', '.pdf']" ref="inputRef" />
                        <el-icon class="absolute! text-3xl! top-0 left-0 right-0 bottom-0 m-auto z-0"><Upload /></el-icon>
                    </div>
                    <p class="text-center text-sm overflow-hidden whitespace-nowrap text-ellipsis">上传</p>
                </div>
            </div>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import lodash from 'lodash';
import { ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import apiKeys from '../../request/apiKeys.js';
import { postRequest, uploadRequest } from '../../request/index.js';
import fileIcon from '../../components/fileIcon/index.vue';

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

// input 上传实例
const inputRef = ref();

// 是否可见
const visible = ref(false);
// 默认表单数据格式
const defaultFormData = {
    ...['eventId', 'reason', 'unitKksCode'].reduce((x, y) => ({ ...x, [y]: '' }), {}),
    fileList: []
};
// 表单数据
const formData = ref(lodash.cloneDeep(defaultFormData));
// 校验规则
const rules = {
    ...['reason']
        .reduce((x, y) => ({ ...x, [y]: [{ required: true, message: '请输入', trigger: 'change' }] }), {})
};
// 表单实例
const formRef = ref();

// 最后修改人
const updateAccountName = ref('');
// 最后修改时间：
const updateTime = ref('');

// 显示
const show = row => {
    updateAccountName.value = row.updateAccountName;
    updateTime.value = row.updateTime;
    formData.value.eventId = row.id;
    formData.value.unitKksCode = row.unitKksCode;
    formData.value.reason = row.exceedReason;
    visible.value = true;
};

// 文件上传
const beforeUpload = event => {
    const limit = 5;
    const maxSize = 10 * 1024 * 1024;
    if (formData.value.fileList.length >= limit) {
        // event.target.value = null;
        inputRef.value.value = null;
        return ElMessage.warning(`至多上传 ${ limit } 个文件`);
    }
    const file = event.target.files[0];
    // 格式控制
    const fileFormat = file.name.split('.').pop().toLowerCase();
    // const supportFormat = (props.supportFormat || []).map(n => n.toLowerCase());
    const supportFormat = ['.xlsx', '.docx', '.pdf'];
    if (!supportFormat.includes(`.${ fileFormat }`)) {
        // event.target.value = null;
        inputRef.value.value = null;
        return ElMessage.warning(`目前仅支持${ supportFormat.join(',') }格式文件`);
    }
    // 大小控制
    if (file.size > maxSize) {
        const val = Math.floor(Math.log2(maxSize) / 10);
        const unit = ['KB', 'MB', 'GB', 'TB'][val - 1];
        // event.target.value = null;
        inputRef.value.value = null;
        return ElMessage.warning(`最大支持${ maxSize / Math.pow(1024, val).toFixed(2) }${ unit }的文件`);
    }
    const requestBody = {
        eventId: formData.value.eventId,
        unitKksCode: formData.value.unitKksCode
    };
    uploadRequest(apiKeys.beyondEventStatistics.uploadBeyondEventStatisticsEventReasonFile, file, requestBody, undefined, undefined, supportFormat, maxSize)
        .then(() => {
            formData.value.fileList.push({
                fileName: file.name,
                fileSize: file.size,
                // fileType: file.type
                fileType: file.name.match(/(?<=\.)[a-zA-Z\d]+$/)?.[0]
            });
        })
        .finally(() => {
            // 如果上传报错/超时，需要取消 input 中的 value 值，否则再次选择相同文件，将无法触发 input 的 change 事件
            // event.target.value = null;
            inputRef.value.value = null;
        });
};

// 移除文件
const removeFile = async file => {
    await ElMessageBox.confirm('确定删除该文件么？', '删除', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' });
    const index = formData.value.fileList.indexOf(file);
    index >= 0 && formData.value.fileList.splice(index, 1);
};

// 保存
const save = async () => {
    await formRef.value.validate();
    const requestBody = {
        eventId: formData.value.eventId,
        reason: formData.value.reason,
        fileList: formData.value.fileList
    };
    postRequest(apiKeys.beyondEventStatistics.updateBeyondEventStatisticsEventReason, requestBody, props.baseURL).then(res => {
        ElMessage.success(res?.msg || '操作成功');
        visible.value = false;
    });
};

// 关闭弹窗时，重置校验表单
watch(visible, val => {
    if (!val) {
        formData.value = lodash.cloneDeep(defaultFormData);
        setTimeout(formRef.value?.clearValidate, 0);
    }
});

// 暴露组件方法
defineExpose({ show });
</script>
<style lang="scss" scoped></style>

