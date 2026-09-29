// export const bizCodeOptions = [
//     { value: 1, label: '电气二次设备' }
// ];

// 基础设备信息，计量设备类型
export const meteringTypeOptions = [
    { value: '10', label: '进出用能单位' },
    { value: '20', label: '次级用能单位' },
    { value: '30', label: '主要用能设备' },
    { value: '40', label: '数据核算' }
];

// 基础设备信息，特种设备类型
export const specialTypeOptions = [
    { value: '10', label: '锅炉' },
    { value: '20', label: '压力容器' },
    { value: '30', label: '压力管道' },
    { value: '40', label: '起重机械' },
    { value: '50', label: '电梯' },
    { value: '60', label: '场车' }
];

// 审批类型
export const approveOptions = [
    { value: '1', label: '同意' },
    { value: '2', label: '驳回' }
];

// 设备超温流程状态（列表形式）
export const overheatFlowOptions = [
    { value: '0', label: '通过', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '为通过', color: 'rgba(245, 108, 108, 1)' },
    { value: '2', label: '审批中', color: 'rgba(230, 162, 60, 1)' }
];
// 设备超温流程状态（对象形式映射，由数组形式计算得到）
export const overheatFlowMap = overheatFlowOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特种设备检索记录流程状态（列表形式）
export const specialDeviceFlowOptions = [
    { value: '0', label: '已检定', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '检定中', color: 'rgba(25, 137, 250, 1)' },
    { value: '2', label: '待检定', color: 'rgba(230, 162, 60, 1)' }
];
// 设备超温流程状态（对象形式映射，由数组形式计算得到）
export const specialDeviceFlowMap = specialDeviceFlowOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特种设备检索记录流程状态（列表形式）
export const deviceDisregardFlowOptions = [
    { value: '0', label: '已完成', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '检驳回', color: 'rgba(245, 108, 108, 1)' },
    { value: '2', label: '待审核', color: 'rgba(230, 162, 60, 1)' }
];
// 设备超温流程状态（对象形式映射，由数组形式计算得到）
export const deviceDisregardFlowMap = deviceDisregardFlowOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 设备启停记录流程状态（列表形式）
export const deviceStartStopFlowOptions = [
    { value: '0', label: '启动', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '停止', color: 'rgba(245, 108, 108, 1)' }
];
// 设备启停记录流程状态（对象形式映射，由数组形式计算得到）
export const deviceStartStopFlowMap = deviceStartStopFlowOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 定检状态（列表形式）
export const waitingDetectionOptions = [
    { value: '0', label: '正常', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '待检查', color: 'rgba(230, 162, 60, 1)' },
    { value: '2', label: '已超期', color: 'rgba(245, 108, 108, 1)' }
];
// 设备启停记录流程状态（对象形式映射，由数组形式计算得到）
export const waitingDetectionMap = waitingDetectionOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 装置类型（列表形式）
export const deviceTypeOptions = [
    { value: '0', label: '压力管道' },
    { value: '1', label: '压力容器' },
    { value: '2', label: '其他' }
];
// 设备启停记录流程状态（对象形式映射，由数组形式计算得到）
export const deviceTypeMap = waitingDetectionOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 泄爆记录管理中的原因
export const reasonTypeOptions = [
    { value: '0', label: '原因 1 先本地写死' },
    { value: '1', label: '原因 2 先本地写死' },
    { value: '2', label: '原因 3 先本地写死' }
];
// 泄爆记录管理中的原因（对象形式映射，由数组形式计算得到）
export const reasonTypeMap = reasonTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 焊工证状态
export const welderCertificateStateOptions = [
    { value: '0', label: '未超期', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '即将到期', color: 'rgba(230, 162, 60, 1)' },
    { value: '2', label: '已超期', color: 'rgba(245, 108, 108, 1)' }
];
// 焊工证状态（对象形式映射，由数组形式计算得到）
export const welderCertificateStateMap = welderCertificateStateOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 无损检测人员-证件状态
export const losslessPersonCertificateStateOptions = [
    { value: '0', label: '未超期', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '即将到期', color: 'rgba(230, 162, 60, 1)' },
    { value: '2', label: '已超期', color: 'rgba(245, 108, 108, 1)' }
];
// 无损检测人员-证件状态（对象形式映射，由数组形式计算得到）
export const losslessPersonCertificateStateMap = losslessPersonCertificateStateOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 年龄状态
export const ageStateOptions = [
    { value: '0', label: '未超期', color: 'rgba(103, 194, 58, 1)' },
    { value: '1', label: '即将到期', color: 'rgba(230, 162, 60, 1)' },
    { value: '2', label: '已超期', color: 'rgba(245, 108, 108, 1)' }
];
// 年龄状态（对象形式映射，由数组形式计算得到）
export const ageStateMap = ageStateOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 字典 code（字典管理中，对处理方法，检查方式，原因分类，密封措施等的 code，目前在代码中写死）
// export const dictionaryCodeOptions = [
//     { value: '1', label: '处理方式' },
//     { value: '2', label: '检查方式' },
//     { value: '3', label: '原因分类' },
//     { value: '4', label: '密封措施' },
// ];
// 物料报废性质
export const materialScrapNatureOptions = [
    { value: '1', label: '一般报废物资' },
    { value: '2', label: '报废固定资产' }
];
// 物料报废性质（对象形式映射，由数组形式计算得到）
export const materialScrapNatureMap = materialScrapNatureOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 物料报废流程状态
export const materialScrapProcessStatusOptions = [
    { value: '1', label: '草稿' },
    { value: '2', label: '流程中' },
    { value: '3', label: '驳回' },
    { value: '4', label: '结束' }
];
// 物料报废流程状态（对象形式映射，由数组形式计算得到）
export const materialScrapProcessStatusMap = materialScrapProcessStatusOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 物料报废转移状态
export const materialScrapTransferStatusOptions = [
    { value: '1', label: '待转移' },
    { value: '2', label: '转移中' },
    { value: '3', label: '已转移' }
];
// 物料报废转移状态（对象形式映射，由数组形式计算得到）
export const materialScrapTransferStatusMap = materialScrapTransferStatusOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 资产树节点类型
export const assetTreeNodeTypeOptions = [
    { value: '01', label: '公司' },
    { value: '02', label: '车间' },
    // { value: '03', label: '工段' },
    { value: '04', label: '工段' },
    // { value: '04', label: '专业' },
    { value: '03', label: '专业' },
    { value: '05', label: '设备类型' },
    { value: '06', label: '设备' }
];
// 资产树节点类型（对象形式映射，由数组形式计算得到）
export const assetTreeNodeTypeMap = assetTreeNodeTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 运行周期管理设备状态
export const cycleManageDeviceStatusOptions = [
    { value: '0', label: '停止', color: '#F56C6C' },
    { value: '1', label: '运行', color: '#67C23A' },
    { value: '2', label: '异常', color: '#F56C6C' }
];
// 运行周期管理设备状态（对象形式映射，由数组形式计算得到）
export const cycleManageDeviceStatusMap = cycleManageDeviceStatusOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 运行周期管理设备切换状态
export const cycleManageDeviceSwitchStatusOptions = [
    { value: '10', label: '正常', color: '#67C23A' },
    { value: '20', label: '待切换', color: '#E6A23C' },
    { value: '30', label: '超时运行', color: '#F56C6C' }
];

// 设备检维修管理/检修文件模板管理，车间类型选项
export const workshopTypeOptions = [
    { value: '0', label: '水处理' },
    { value: '1', label: '热电' },
    { value: '2', label: '备煤' }
];

// 专业类型选项
export const professionalTypeOptions = [
    { value: '10', label: '仪控专业' },
    { value: '20', label: '机务专业' },
    { value: '30', label: '电气专业' },
    { value: '40', label: '电气二次专业' }
];

// 设备检维修管理/检修文件模板管理，文件状态选项
export const fileStateOptions = [
    { value: '10', label: '草稿', color: '#909399' },
    { value: '20', label: '已上传文件', color: '#409EFF' },
    { value: '30', label: '审批中', color: '#E6A23C' },
    { value: '40', label: '驳回', color: '#F56C6C' },
    { value: '50', label: '已生效', color: '#67C23A' },
    { value: '60', label: '修订中', color: '#E6A23C' }
];

// 设备检维修管理/检修文件模板管理，文件类型选项
export const fileTypeOptions = [
    // { value: '0', label: '文件类型-0' },
    // { value: '1', label: '文件类型-1' },
    // { value: '2', label: '文件类型-2' }
];

// 设备检维修管理/检修名称管理，检修类型
export const maintenanceTypeOptions = [
    { value: '0', label: '检修类型-0' },
    { value: '1', label: '检修类型-1' },
    { value: '2', label: '检修类型-2' }
];

// 设备检维修管理/检修项目管理，项目类型
export const projectTypeOptions = [
    { value: '0', label: '项目类型-0' },
    { value: '1', label: '项目类型-1' },
    { value: '2', label: '项目类型-2' }
];

// 设备检维修管理/检修项目管理，检修等级
export const measuresLevelOptions = [
    { value: '10', label: '大修' },
    { value: '20', label: '小修' }
];

// 设备检维修管理/检修项目管理，项目状态
export const projectStateOptions = [
    { value: '10', label: '草稿', color: '#909399' },
    { value: '20', label: '已选择文件', color: '#E6A23C' },
    { value: '30', label: '审批中', color: '#409EFF' },
    { value: '40', label: '驳回', color: '#F56C6C' },
    { value: '50', label: '待执行', color: '#409EFF' },
    { value: '60', label: '开工', color: '#409EFF' },
    { value: '70', label: '待上传完工文件', color: '#E6A23C' },
    { value: '80', label: '完工', color: '#67C23A' },
    { value: '90', label: '取消', color: '#909399' }
];

// 设备检维修管理/检修进度管理，过程状态
export const maintenanceCourseStateOptions = [
    { value: '10', label: '草稿' },
    { value: '20', label: '已选择文件' },
    { value: '30', label: '审批中' },
    { value: '40', label: '驳回' },
    { value: '50', label: '待执行' },
    { value: '60', label: '开工' },
    { value: '70', label: '待上传完工文件' },
    { value: '80', label: '完工' },
    { value: '90', label: '取消' }
];

// 设备检维修管理/检修进度管理，进度状态
export const maintenanceProcessStateOptions = [
    { value: '10', label: '正常', color: '#67C23A' },
    { value: '20', label: '提醒', color: '#E6A23C' },
    { value: '30', label: '滞后', color: '#F56C6C' }
];

// 设备检维修管理/检修进度管理，项目状态
export const maintenanceProcessProjectStateOptions = [
    { value: '10', label: '草稿', color: '#909399' },
    { value: '20', label: '已选择文件', color: '#E6A23C' },
    { value: '30', label: '审批中', color: '#409EFF' },
    { value: '40', label: '驳回', color: '#F56C6C' },
    { value: '50', label: '待执行', color: '#409EFF' },
    { value: '60', label: '开工', color: '#409EFF' },
    { value: '70', label: '待上传完工文件', color: '#E6A23C' },
    { value: '80', label: '完工', color: '#67C23A' },
    { value: '90', label: '取消', color: '#909399' }
];

// 特殊设备类型
export const specialDeviceTypeOptions = [
    { value: '10', label: '锅炉' },
    { value: '20', label: '压力容器' },
    { value: '30', label: '压力管道' },
    { value: '40', label: '起重机械' },
    { value: '50', label: '电梯' },
    { value: '60', label: '场车' }
];
// 特殊设备类型（对象形式映射，由数组形式计算得到）
export const specialDeviceTypeMap = specialDeviceTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特殊/计量/仪控强检设备类型检测状态
export const specialMeteringMandatoryInspectionCheckTypeOptions = [
    { value: '1', label: '正常', color: '#67c23a' },
    { value: '2', label: '待检查', color: '#FF7800' },
    { value: '3', label: '已超期', color: '#f56c6c' },
    // { value: '4', label: '待检查', color: '#FCCF14' }
];
// 特殊/计量/仪控强检设备类型检测状态（对象形式映射，由数组形式计算得到）
export const specialMeteringMandatoryInspectionCheckTypeMap = specialMeteringMandatoryInspectionCheckTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 月-周下拉项
export const monthWeekRangeOptions = [
    { value: '1', label: '第一周(1号-7号)' },
    { value: '2', label: '第二周(8号-14号)' },
    { value: '3', label: '第三周(15号-21号)' },
    { value: '4', label: '第四周(22号-月末)' }
];

// 特殊设备管理 > 隐患排查记录(隐患类别)
export const specialDeviceHazardInvestigationRecordTypeOptions = [
    { value: '10', label: '设备设施' },
    { value: '20', label: '安全管理' },
    { value: '30', label: '其他' }
];
// 特殊设备管理 > 隐患排查记录(隐患类别，对象形式映射，由数组形式计算得到)
export const specialDeviceHazardInvestigationRecordTypeMap = specialDeviceHazardInvestigationRecordTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特殊设备管理 > 隐患排查记录(隐患等级)
export const specialDeviceHazardInvestigationRecordLevelOptions = [
    { value: '10', label: '重大隐患' },
    { value: '20', label: '一般隐患' }
];
// 特殊设备管理 > 隐患排查记录(隐患等级，对象形式映射，由数组形式计算得到)
export const specialDeviceHazardInvestigationRecordLevelMap = specialDeviceHazardInvestigationRecordLevelOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特殊设备管理 > 隐患排查记录(整改等级)
export const specialDeviceHazardInvestigationRecordRectificationLevelOptions = [
    { value: '10', label: '车间级' },
    { value: '20', label: '公司级别' }
];
// 特殊设备管理 > 隐患排查记录(整改等级，对象形式映射，由数组形式计算得到)
export const specialDeviceHazardInvestigationRecordRectificationLevelMap = specialDeviceHazardInvestigationRecordRectificationLevelOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 前期项目状态
// export const earlyProjectStateOptions = [
//     { value: '0', label: '前期项目状态-0' },
//     { value: '1', label: '前期项目状态-1' },
//     { value: '2', label: '前期项目状态-2' },
//     { value: '3', label: '前期项目状态-3' }
// ];

// 前期项目类型
// export const earlyProjectTypeOptions = [
//     { value: '0', label: '前期项目类型-0' },
//     { value: '1', label: '前期项目类型-1' },
//     { value: '2', label: '前期项目类型-2' },
//     { value: '3', label: '前期项目类型-3' }
// ];

// 智能设备寿命管理 > 设备管理(运行状态)
export const smartDeviceRunStateOptions = [
    { value: 0, label: '运行设备', color: '#67C23A' },
    { value: 1, label: '预警设备', color: '#F56C6C' },
    { value: 2, label: '停机维护', color: '#E6A23C' }
];

// 设备预防性维护 > 设备定期维护标准(工作类型)
export const deviceMaintenanceStandardWorkTypeOptions = [
    // { value: 0, label: '工作类型-0' },
    // { value: 1, label: '工作类型-1' },
    // { value: 2, label: '工作类型-2' }
];

// 设备预防性维护 > 设备定期维护标准(生效状态)
export const deviceMaintenanceStandardStatusOptions = [
    { value: '10', label: '未生效', color: '#909399' },
    { value: '20', label: '已生效', color: '#67C23A' },
    { value: '30', label: '已失效', color: '#F56C6C' }
];

// 设备预防性维护 > 设备定期维护标准(流程状态)
export const deviceMaintenanceStandardProcessStatusOptions = [
    { value: '10', label: '草稿', color: '#909399' },
    { value: '20', label: '审批中', color: '#409EFF' },
    { value: '30', label: '审批驳回', color: '#F56C6C' },
    { value: '40', label: '审批通过', color: '#67C23A' },
    { value: '50', label: '作废审批中', color: '#409EFF' },
    { value: '60', label: '作废驳回', color: '#F56C6C' },
    { value: '70', label: '已作废', color: '#F56C6C' }
];

// 设备预防性维护 > 设备定期维护执行(工单状态)
export const deviceMaintenanceBillStateOptions = [
    { value: '10', label: '正常', color: '#67C23A' },
    { value: '20', label: '超时', color: '#E6A23C' },
    { value: '30', label: '全部', color: '#909399' }
];

// 备品备件管理 > 仓库库存(评估类)
export const warehouseInventoryEvaluationCategoryOptions = [
    { value: '01', label: '原材料-设备及备件' },
    { value: '02', label: '原材料-消耗性材料' },
    { value: '03', label: '原材料-其他' }
];
// 备品备件管理 > 仓库库存(评估类，对象形式映射，由数组形式计算得到)
export const warehouseInventoryEvaluationCategoryMap = warehouseInventoryEvaluationCategoryOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 备品备件管理 > 物料总库存(库存状态)
export const materialAmountInventoryStateOptions = [
    { value: '0', label: '正常', color: '#67C23A' },
    { value: '-1', label: '缺少库存', color: '#F56C6C' }
];
// 备品备件管理 > 物料总库存(库存状态，对象形式映射，由数组形式计算得到)
export const materialAmountInventoryStateMap = materialAmountInventoryStateOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});

// 特殊设备管理 > 计量设备类别(库存状态)
export const meteringDeviceLevelOptions = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' }
];

// 特殊设备管理 > 计量器具台账(检验状态)
export const meteringToolLedgerCheckStateOptions = [
    { value: '1', label: '正常', color: '#67c23a' },
    { value: '2', label: '待检定', color: '#FCCF14' },
    { value: '3', label: '已超期', color: '#f56c6c' }
];

// 特殊设备管理 > 工器具台账(检验状态)
export const toolLedgerFeatureCategoryOptions = [
    { value: '10', label: '防爆工具' },
    { value: '20', label: '电动工具' },
    { value: '30', label: '无危险特性' },
    { value: '40', label: '其他' }
];

// 备品备件(库存状态)
export const sparePartInventoryStateOptions = [
    { value: '0', label: '正常' },
    { value: '-1', label: '缺少库存' }
];

// 超温超压统计 > 越限事件列表统计-类型
export const beyondEventTypeOptions = [
    { value: '10', label: '汽温' },
    { value: '20', label: '壁温' },
    { value: '30', label: '环保参数' },
    { value: '40', label: '压力' }
];
// 示意范例（对象形式映射，由数组形式计算得到）
export const beyondEventTypeMap = beyondEventTypeOptions.reduce((x, y) => ({ ...x, [y.value]: y }), {});