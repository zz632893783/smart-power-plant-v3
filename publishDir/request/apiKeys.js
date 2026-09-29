// 接口名称映射
export default {
    // 公共
    common: {
        // 获取设备树数据
        getDeviceTree: '/gateway/empower-service/api/deviceTree/getTree',
        // 上传文件
        uploadFile: '/gateway/prognosis-service/api/base/file/upload',
        // 文件列表
        getFileList: '/gateway/prognosis-service/api/base/file/list',
        // 删除文件
        deleteFile: '/gateway/prognosis-service/api/base/file/delete',
        // 下载文件
        downloadFile: '/gateway/prognosis-service/api/base/file/download',
        // 根据业务 id 下载文件
        downloadFileByBusinessId: '/gateway/prognosis-service/api/base/apply/download',
        // 更新文件
        updateFile: '/gateway/prognosis-service/api/base/file/updateFile',
        // 登录
        login: '/gateway/sys-manager-service/ui/sys/loginBack',
        // 导入模板下载
        /*
            bizCode 说明
                |-设备基础信息模板
                |   |-设备类型模板 1
                |   |-备品备件 17
                |-技术监督模板
                |   |-压力管道 2
                |   |-压力容器 3
                |   |-更换处理记录 4
                |   |-焊口检查记录 5
                |   |-密封记录 6
                |   |-管壁测厚记录 7
                |   |-焊工证 8
                |   |-焊接质量 9
                |   |-无损检测人员 10
                |   |-无损检测报告 11
                |-运行配置模板
                |   |-运行配置模板 12
                |-设备检维修
                    |-检维模板 13
                    |-检修项目仪控专业模板 14
                    |-检修项目机务专业模板 15
                    |-检修项目电气专业模板 16
         */
        templateDownload: '/gateway/prognosis-service/api/base/file/downTemplate',
        // 获取用户信息（用户信息，路由权限等）
        getUserInfo: '/gateway/sys-manager-service/ui/sys/user/xtUserInfo',
        // 上传文件，不保存记录
        uploadFileNoRecord: '/gateway/prognosis-service/api/base/file/uploadByBizCode',
        // 获取用户部门
        getUserDepartment: '/gateway/sys-manager-service/ui/sys/user/getUserDepartment',
        // 批量获取用户信息
        // getUserByAccountIds: '/gateway/sys-manager-service/ui/sys/userApi/getUserByAccountIds',
        // 批量获取部门信息
        // getDepartmentByIds: '/gateway/sys-manager-service/ui/sys/department/getDepByIds',
        // 批量获取用户信息和部门信息
        getUserAndDept: '/gateway/sys-manager-service/ui/sys/user/getUserAndDept',
        // 获取所有的部门
        getDepartmentOptions: '/gateway/sys-manager-service/ui/sys/department/getAllDep',
        // 获取用户列表
        getAccountList: '/gateway/sys-manager-service/ui/sys/user/pageByOrg',
        // 根据 id 批量获取用户信息
        getUserInformationByIds: '/gateway/sys-manager-service/ui/sys/user/getUserByAccountIds',
        // 获取某个资产树节点，从根节点到当前节点的链路
        getRootToCurrentNodePath: '/gateway/empower-service/api/deviceTree/getFloorParentNodes',
        // 获取下一级的资产树节点
        getNextChildAssetNodes: '/gateway/empower-service/api/deviceTree/listChild',
        // 查询第一个审批节点配置
        getFirstApproveConfig: '/gateway/workflow-service/workflow/instance/firstApproveConfig',
        // 查询后续配置节点集合
        getApproveConfigNodes: '/gateway/workflow-service/workflow/instance/listNextNode',
        // 查询下个节点配置
        getNextNodeConfig: '/gateway/workflow-service/workflow/instance/nextNodeConfig',
        // 是否允许简易驳回
        queryAllowSampleReject: '/gateway/workflow-service/workflow/instance/allowSimpleReject',
        // 分页查询用户列表
        getUserList: '/gateway/sys-manager-service/ui/sys/user/page',
        // 分页查询角色列表
        getRoleList: '/gateway/sys-manager-service/ui/sys/role/page',
        // 展示流程模型
        getFlowNodeByFlowInstanceId: '/gateway/workflow-service/workflow/instance/displayFlowModel',
        // ticket 兑换 token
        ticketExchangeToken: '/gateway/sys-manager-service/ui/sys/cas/login',
        // 获取部门列表
        getDepartmentList: '/gateway/sys-manager-service/ui/sys/department/page',
        // 下载文件（根据上传的文件信息下载，无论该文件是否入库）
        downloadFileByInfo: '/gateway/prognosis-service/api/base/file/downloadFileInfo',
    },
    // 超温超压统计
    beyondEventStatistics: {
        // 超温超压统计 > 越限事件列表统计 > 事件列表(获取值次下拉)
        getValueTimesOptions: '/gateway/intelligent-base-service/api/team/getTeamName',
        // 超温超压统计 > 越限事件列表统计 > 事件列表(分页)
        getBeyondEventStatisticsEventList: '/gateway/intelligent-base-service/api/exceedTemperatureEven/pageList',
        // 超温超压统计 > 越限事件列表统计 > 事件列表(导出)
        exportBeyondEventStatisticsEventList: '/gateway/intelligent-base-service/api/exceedTemperatureEven/export',
        // 超温超压统计 > 越限事件列表统计 > 事件列表(趋势)
        getBeyondEventStatisticsEventTrend: '/gateway/intelligent-base-service/api/exceedTemperatureEven/getTrend',
        // 超温超压统计 > 越限事件列表统计 > 事件列表(超温原因附件上传)
        uploadBeyondEventStatisticsEventReasonFile: '/gateway/intelligent-base-service/api/exceedTemperatureEven/upload',
        // 超温超压统计 > 越限事件列表统计 > 事件列表(编辑超温原因)
        updateBeyondEventStatisticsEventReason: '/gateway/intelligent-base-service/api/exceedTemperatureEven/updateReason',

        // 超温超压统计 > 越限事件列表统计 > 事件统计(饼图与统计列表)
        getBeyondEventStatisticsPieTableData: '/gateway/intelligent-base-service/api/exceedTemperatureEven/countEvent',
        // 超温超压统计 > 越限事件列表统计 > 测点事件统计(分页)
        getBeyondEventStatisticsTestPointEventList: '/gateway/intelligent-base-service/api/exceedTemperatureEven/countIndexEven',
        // 超温超压统计 > 越限事件列表统计 > 测点事件统计(导出)
        exportBeyondEventStatisticsTestPointEventList: '/gateway/intelligent-base-service/api/exceedTemperatureEven/exportIndexEven',
        // 超温超压统计 > 越限事件列表统计 > 事件统计(月度)
        getBeyondEventMonthStatisticsPieTableData: '/gateway/intelligent-base-service/api/exceedTemperatureEven/countEventByCustom',

        // 超温超压统计 > 参数限制配置(分页)
        getParameterLimitConfigList: '/gateway/intelligent-base-service/api/exceedTemperature/pageList',
        // 超温超压统计 > 参数限制配置(新增/编辑阶段输入指标编码时，检索列表)
        getParameterLimitConfigIndexList: '/gateway/empower-service/api/characterParam/listInfoByKeyword',
        // 超温超压统计 > 参数限制配置(新增/编辑阶段配置停止条件时，检索指标列表)
        getParameterLimitConfigIndexListByNodeKksCodePage: '/gateway/empower-service/api/characterParam/listByNodeKksCodePage',
        // 超温超压统计 > 参数限制配置(规则转译)
        parameterLimitConfigRuleTrans: '/gateway/intelligent-base-service/api/exceedTemperature/ruleTrans',
        // 超温超压统计 > 参数限制配置(新增)
        createParameterLimitConfig: '/gateway/intelligent-base-service/api/exceedTemperature/save',
        // 超温超压统计 > 参数限制配置(编辑)
        updateParameterLimitConfig: '/gateway/intelligent-base-service/api/exceedTemperature/update',
        // 超温超压统计 > 参数限制配置(导出)
        exportParameterLimitConfig: '/gateway/intelligent-base-service/api/exceedTemperature/export',
        // 超温超压统计 > 参数限制配置(删除)
        deleteParameterLimitConfig: '/gateway/intelligent-base-service/api/exceedTemperature/delete',
        // 超温超压统计 > 参数限制配置(修改状态)
        updateParameterLimitConfigState: '/gateway/intelligent-base-service/api/exceedTemperature/updateStatuses',
        // 超温超压统计 > 参数限制配置(获取事件过滤规则配置)
        getParameterLimitConfigRules: '/gateway/intelligent-base-service/api/exceedTemperatureEven/getRule',
        // 超温超压统计 > 参数限制配置(创建事件过滤规则配置)
        createParameterLimitConfigRule: '/gateway/intelligent-base-service/api/exceedTemperatureEven/saveRule',
        // 超温超压统计 > 参数限制配置(编辑事件过滤规则配置)
        updateParameterLimitConfigRule: '/gateway/intelligent-base-service/api/exceedTemperatureEven/updateRule',
        // 超温超压统计 > 参数限制配置(导入)
        importParameterLimitConfig: '/gateway/intelligent-base-service/api/exceedTemperature/upload',
        // 超温超压统计 > 参数限制配置(导入模板下载)
        downloadParameterLimitConfigTemplate: '/gateway/intelligent-base-service/api/exceedTemperature/download'
    }
};
