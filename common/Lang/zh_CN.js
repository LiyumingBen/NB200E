//T 开头表示名词  A 开头表示提示  C 开头表示需确认

const zh_CN = {
    //语言
    T_Lang:                                      "语言",
    T_Lang_Chinese:                              "中文",
    T_Welcome_Use:                               "欢迎使用",
    T_Platform:                                  "平台",
    T_UserName:                                  "用户名",
    T_Change_Password:                           "修改密码",
    //状态
    T_Status:                                    "状态",
    T_Status_Tips:                               "提示",


    // 编码设置
    T_Encoder_Settings:                          "编码设置",

    //设置
    T_Settings:                                  "设置",
    T_Settings_Enable:                           "启用",
    T_Settings_Disable:                          "禁用",
    T_Settings_Automatic:                        "自动",
    T_Settings_Basic_Settings:                   "基本设置",
    T_Settings_Advance_Settings:                 "高级设置",

    A_Settings_Parameter_NoChange:               "参数未改变！",
    A_Setting_Success:                           "设置成功！",
    A_Remove_Success:                            "移除成功！",

    //输入输出
    T_Input:                                     "输入",
    T_Output:                                    "输出",
    T_Input_Status:                              "输入状态",
    T_Output_Status:                             "输出状态",
    T_Input_Resolution:                          "输入分辨率",
    T_Output_Resolution:                         "输出分辨率",

    //用户相关
    T_Password:                                  "密码",
    T_Login:                                     "登录",
    T_Logout:                                    "退出登录",
    T_License:                                   "授权",
    T_Unauthorized:                              "未授权",
    T_Authorized:                                "已授权",
    A_Encryption_Stream_Authorized:              "输入是加密流，需要HDCP授权才有输出。",
	A_H265_Unauthorized:                         "H265未授权",
	A_CC_Unauthorized:                           "CC未授权",
	A_HDCP_Unauthorized:                         "HDCP未授权",
	A_H265_Authorized:                           "H265已授权",
	A_CC_Authorized:                             "CC已授权",
	A_HDCP_Authorized:                           "HDCP已授权",

    A_Page_Not_Exist:                            "不好意思，您访问的页面不存在！",
    A_404_Tips_0:                                "您可以",
    A_404_Tips_1:                                "返回上一页",
    A_404_Tips_2:                                "去首页",
    A_Operation_Failed:                          "亲，失败了哟！",
    A_UserName_Cannot_Be_Empty:                  "用户名不能为空,请重新输入！",

    //系统
    T_System:                                    "系统",
    T_System_Settings:                           "系统设置",
    T_System_Operation:                          "系统操作",
    T_Other_Operation:                           "其他操作",
    T_System_Software_Version:                   "软件版本",
    T_System_Hardware_Version:                   "硬件版本",
    T_System_Upgrade:                            "升级",
    T_System_Reboot:                             "重启",
    T_System_Factory_Settings:                   "恢复出厂设置",
    T_System_Version:                            "版本",
    T_System_Log_Export:                         "导出日志",
    T_System_Log_Clear:                          "清除日志",
    A_Rebooting:                                 "设备正在重启，请稍后...",
    A_System_Restoring_Factory_Settings:         "正在恢复出厂设置，请稍后…",
    A_Uploading_File:                            "正在上传文件...",
    A_File_Upgrade_Failed:                       "升级失败！",
    A_Processing_After_Uploaded:                 "文件上传成功! 设备正在处理上传的文件，请稍后...",
    A_Configuration_File_Type_Error:             "导入的配置文件类型有误，请重新选择！(.tar)",
    A_License_File_Type_Error:                   "导入的授权文件类型有误，请重新选择！(.license)",
    A_Upgrade_File_Type_Error:                   "导入的升级文件类型有误，请重新选择！(.WVUpgrade)",
    A_Service_List_File_Type_Error:              "导入的节目列表文件类型有误，请重新选择！(.txt)",
    A_Import_Configuration_Failed:               "导入参数失败！",
    A_Import_Service_List_Failed:                "导入节目列表失败！",
    A_Import_License_Failed:                     "导入授权失败！",
    T_System_Import_License:                     "导入授权",
    T_System_Export_License:                     "导出授权",
    T_System_Export_Configuration:               "导出配置",
    T_System_Import_Configuration:               "导入配置",
    A_Exporting_Configuration:                   "正在导出参数配置，请稍后...",
    A_Exporting_License:                         "正在导出授权文件，请稍后...",
    A_Export_Failed:                             "导出配置文件失败！",
    A_Log_Clear_Success:                         "日志清除成功！",
    A_Import_Success:                            "导入成功！",

    C_Export_Configuration:                      "是否确定要导出配置？",
    C_Export_License_File:                       "是否确定要导出授权文件？",
    C_System_Restore_Factory_Settings:           "是否确定要恢复出厂设置？",
    C_System_Export_Logs:                        "是否确定要导出日志？",
    C_System_Clear_Logs:                         "是否确定要清除日志？",
    C_Reboot_This_Baseboard:                     "是否确定要重启设备？",
    C_Reboot_This_Module:                        "是否确定要重启模块？",
    C_Reboot_After_Factory_Settings:             "恢复出厂设置需重启生效，是否立即重启？",
    C_Reboot_After_Import_Configuration:         "参数导入成功需重启后生效，是否立即重启？",
    C_Reboot_After_Upgrade:                      "升级成功，需要重启后生效，是否立刻重启生效？",
    C_Reboot_After_Import_License:               "授权成功，需要重启后生效，是否立刻重启生效？",
    C_Reboot_After_Change_Type:                  "改变类型成功，需要重启后生效，是否立刻重启生效？",
    C_Reboot_After_Setting_Parameters:           "设置参数成功，需要重启后生效，是否立刻重启生效？",
    C_Restore_Factory_Settings:                  "是否确定要恢复出厂设置？",

    //密码修改
    T_Current_Password:                          "当前密码",
    T_New_Password:                              "新密码",
    T_Confirm_Password:                          "确认密码",

    A_Current_Password_Error:                    (range)=>`旧密码输入有误，密码长度范围:${range}`,
    A_New_Password_Error:                        (range)=>`新密码输入有误，密码长度范围:${range}`,
    A_Confirmation_Password_Error:               (range)=>`密码确认输入有误，密码长度范围:${range}`,
    A_Current_New_Password_Is_Same:              "新旧密码不能相同",
    A_New_Confirmation_Password_Not_Same:        "新密码输入不一致",
    A_Password_Changed:                          "密码修改成功,请重新登录!",

    //操作
    T_Apply:                                     "应用",
    T_OK:                                        "确定",
    T_Cancel:                                    "取消",
    T_Sure:                                      "确认",
    T_Delete:                                    "删除",
    T_Add:                                       "添加",
    T_Edit:                                      "编辑",
    T_Delete_All:                                "全部删除",
    T_Reset:                                     "重置",
    T_Browse:                                    "浏览",
    T_Upload:                                    "上传",
    T_Export:                                    "导出",
    T_ReturnToLastPage:                          "返回上一页",
    T_BackToHomePage:                            "去首页",
    T_Close:                                     "关闭",
    T_Search:                                    "搜索",
    T_Clear_Setting:                             "清除配置",
    T_Operation:                                 "操作",

    A_Please_Select_File:                        "请选择文件!",

    //网络
    T_Network:                                   "网络",
    T_Network_IPAddress:                         "IP地址",
    T_Network_SubnetMask:                        "子网掩码",
    T_Network_DefaultGateway:                    "默认网关",
    T_Dynamic_DNS:                               "动态DNS",
    T_Network_MACAddress:                        "MAC地址",

    A_Network_MAC_Conflicted:                    "MAC地址冲突！",
    A_Network_Error_Connection_Timeout:          "网络出现问题，连接超时！",
    A_IPAddress_FormatError:                     "IP地址格式错误，请检查后重试！",
    A_SubnetMask_FormatError:                    "子网掩码格式错误，请检查后重试！",
    A_DefaultGateway_FormatError:                "默认网关格式错误，请检查后重试！",
    A_Configuring_Network:                       "正在配置网络!",




    T_Information:                               "信息",
    A_Error:                                     "错误",

    //编码相关
    T_Status_Effective_Bitrate:                  "有效码率",
    T_Status_Total_Bitrate:                      "总码率",
    T_Encode_Video_Resolution:                   "视频分辨率",
    T_Encode_Video_Type:                         "视频编码类型",
    T_Encode_Video_Bitrate:                      "视频编码码率",
    T_Encode_Video_Mode:                         "视频编码模式",
    T_Encode_Video_Max_Bitrate:                  "视频最大编码码率",
    T_Encode_Video_Min_Bitrate:                  "视频最小编码码率",
    T_Encode_GOP_Size:                           "GOP大小",
    T_Encode_Profile:                            "Profile",
    T_Encode_Video_Aspect_Ratio:                 "视频宽高比",
    T_Encode_VideoFrameRate:                     "视频帧率",
    T_Encode_Video:                              "视频",
    T_Resolution:                                "分辨率",

    T_Encode_Audio_Type:                         "音频编码类型",
    T_Encode_Audio_Bitrate:                      "音频编码码率",
    T_Encode_Audio_Sampling_Bitrate:             "音频采样率",
    T_Encode_Audio:                              "音频",

    T_Status_Video_Bitrate:                      "视频码率",
    T_Status_Audio_Bitrate:                      "音频码率",
    T_Status_Encryption:                         "加密状态",
    T_Status_Encrypted:                          "加密",
    T_Status_Unencrypted:                        "未加密",


    A_Video_Bitrate_Err:                         (min,max)=>`视频编码码率输入有误，请重新输入一个${min}到${max}之间的整数！`,
    A_GOP_Size_Err:                              (min,max)=>`GOP大小输入有误，请重新输入一个${min}到${max}之间的整数！`,


    //RTMP编码输出
    T_RTMP_Enable:                               "启用RTMP",
    T_RTMP_Serverip:                             "URL",
    T_RTMP_Serverport:                           "端口",
    T_RTMP_Appname:                              "目录名",
    T_RTMP_Streamname:                           "上传节点",
    T_Encryt:                                    "认证",
    T_RTMP_Username:                             "用户名",
    T_RTMP_Password:                             "密码",
    A_RTMP_Serverport_Err:                       (min, max) => `RTMP 服务器端口值必须介于[${min}, ${max}].`,
    A_Video_Frame_Err:                           (min, max) => `视频帧率输入有误，请重新输入一个${min}到${max}之间的整数！`,

    T_UDP_Enable:                                "启用HUDP",
    T_UDP_Serverip:                              "地址",
    T_UDP_Serverport:                            "端口",

    T_Live_Stream:                               "直播",
    T_Record_Stream:                             "录播",
    T_Start_Live_Stream:                         "启动直播",
    T_Stop_Live_Stream:                          "停止直播",
    T_Start_Recording:                           "开始录播",
    T_Stop_Recording:                            "停止录播",
    T_Output_File:                               "输出文件",
    T_Init:                                      "初始化",
    T_Init_Status:                               "初始化状态",
    T_Record:                                    "录播",
    T_Record_Settings:                           "录播设置",
    T_Advanced:                                  "高级",
    T_General:                                   "普通",
    T_Presets:                                   "视频流格式",
    T_StreamName:                                "流名称",
    T_Record_Mode:                               "录播模式",
    T_StorageDevice:                             "存储类型",
    T_Record_name:                               "录播名称",
    T_Record_Size:                               "录播大小",
    T_Record_Time:                               "录播时间",
    T_Loop_Enable:                               "循环",
    T_Record_Enable:                             "录制",
    T_Broadcast:                                 "广播节目/",
    T_Broadcast_LiveStream:                      "直播节目/推流设置",
    T_Parameter_Info:                            "参数信息",
    T_Local_Infomation:                          "当前处于",
    A_LeavePage_Tip:                             "您确定要离开此页面吗？ 您的更改将被丢弃。",
    T_Signal_Source:                             "信号源",
    T_Connect_Successed:                         "连接成功",
    T_Connect_Failed:                            "连接失败",
    T_Address_Mode:                              "网络模式",
    T_Secondary_Nameserver:                      "辅域名服务器",
    T_Primary_Nameserver:                        "主域名服务器",
    T_HLS_Enable:                                "启用HLS",
    T_ServerPath:                                "存放路径",
    T_Tip_User_Defined:                          "请在高级页面配置参数",
    C_Remove_USB:                                "确定安全移除USB？",
    C_Remove_SD:                                 "确定安全移除SD？",

    T_NOt_Inserted:                              "未插入",
    T_Free:                                      "空闲",
    T_Recording:                                 "正在录制",
    T_Recorded:                                  "录制完成",
    T_Safety_Remove:                             "安全移除",
    T_SD_Not_Written:                            "NO",
    T_USB_Not_Written:                           "NO",
    T_USB_File_System:                           "USB文件系统",
    T_SD_File_System:                            "SD文件系统",
    T_Written_Permission:                        "写权限",
    T_License_Information:                       "授权信息",

    A_Record_Size_Err:                           (min,max)=>`录制大小输入有误，请重新输入一个${min}到${max}之间的整数！`,
    A_Time_Format_Error:                         "时间格式不正确, 正确格式：(HH:mm:ss)",

    T_Serial_License:                            "串口授权",
    A_Browser_Version_Tip:                       "由于浏览器版本低，网页功能可能无法使用，",
    A_Browser_Version_Tip1:                      "建议使用IE10 +，最新的Chrome，最新的Firefox浏览器！",

    //parameter tips
    //Live Service Stream Settings



};


export default zh_CN;