
import { StepNext, PageNext, PageBackTo, PageRelaunch, DataCache, StepContent, 
    UpateCurrentPageData, 
    } from "../../core/engine";
import JsUtil from "../utils/jsutil";

export const Page_Pharmacist_VerifyMasters=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/verify/masters/index",
                title: "审核列表页",
                wxcall:{
                    verifyCards_onItemClick:(item)=>{
                        console.log("verifyCards_onItemClick invoked = ", item)
                        if(item.id==='verify') PageNext(0);
                        else if(item.id==='see') PageNext(1);
                        // UpateCurrentPageData({
                        //     verifyCards_Area: {
                        //         emptyTips: "暂未找到待审核记录",
                        //         listData: [
                        //             {
                        //                 id: "1",
                        //                 isChecked: false,
                        //                 title: '张三的处方',
                        //                 amt: '0',
                        //                 contents: [
                        //                     { label: "病人姓名", value: "张三" },
                        //                     { label: "诊断结果", value: "发烧" },
                        //                     { label: "医生姓名", value: "李医生" },
                        //                     { label: "订单状态", value: "待审核" },
                        //                     { label: "创建时间", value: "2022-01-02 12:00:00" },
                        //                 ],
                        //                 rightBtns: [
                        //                     { id: "verify", btnName: "审核" },
                        //                 ]
                        //             },
                        //         ]
                        //     }
                        // })
                    }
                },
                data:{
                    verifyCards_Area: {
                        emptyTips: "暂未找到待审核记录",
                        listData: [
                            {
                                id: "1",
                                isChecked: false,
                                title: '张三的处方',
                                amt: '0',
                                contents: [
                                    { label: "病人姓名", value: "张三" },
                                    { label: "诊断结果", value: "发烧" },
                                    { label: "医生姓名", value: "李医生" },
                                    { label: "订单状态", value: "待审核" },
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "verify", btnName: "审核" },
                                ]
                            },
                            {
                                id: "2",
                                isChecked: false,
                                title: '李四三的处方',
                                amt: '0',
                                contents: [
                                    { label: "病人姓名", value: "李四三" },
                                    { label: "诊断结果", value: "发烧" },
                                    { label: "医生姓名", value: "李医生" },
                                    { label: "订单状态", value: "审核通过", color: "#70B603"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "查看" },
                                ]
                            },
                            {
                                id: "3",
                                isChecked: false,
                                title: '王五的处方',
                                amt: '0',
                                contents: [
                                    { label: "病人姓名", value: "王五" },
                                    { label: "诊断结果", value: "发烧" },
                                    { label: "医生姓名", value: "李医生" },
                                    { label: "订单状态", value: "审核拒绝", color: "#D9001B"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "查看" },
                                ]
                            },
                            {
                                id: "4",
                                isChecked: false,
                                title: '赵六的处方',
                                amt: '0',
                                contents: [
                                    { label: "病人姓名", value: "赵六" },
                                    { label: "诊断结果", value: "发烧" },
                                    { label: "医生姓名", value: "李医生" },
                                    { label: "订单状态", value: "审核中", color: "#0000BF"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "查看" },
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
}


export const Page_Pharmacist_Verify_Opt=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/verify/opt/index",
                title: "审核操作页",
                wxcall:{
                    // 通过按钮
                    passBtn_onClick:()=>{
                        console.log("passBtn_onClick invoked ")
                        PageNext(-1);
                    },
                    refuseBtn_onClick:()=>{
                        console.log("refuseBtn_onClick invoked ")
                        PageNext(0);
                    }
                },
                data:{
                    forms:[
                        {"label": "姓  名", "value":"喜洋洋"},
                        {"label": "年  龄", "value":"23 岁"},
                        {"label": "性  别", "value":"男"},
                        {"label": "手机号", "value":"18651234456"},
                        {"label": "创建日期", "value":"2022-03-03"},
                    ],
                    zdxx: "肺结核待查，需要做CT平扫，血常规。业务处理",
                    paybills_Area:{
                        listData:[
                            {
                                id: "1",
                                title: {label: "处方类型：", value: "西药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "头孢拉丁胶囊"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ],
                                  [
                                    {label: "药品名称", value: "阿莫西林分散片"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ]
                                ]
                              },
                              {
                                id: "2",
                                title: {label: "处方类型：", value: "中药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "当归"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                              {
                                id: "3",
                                title: {label: "处方类型：", value: "检查"},
                                contents:[
                                  [
                                    {label: "项目名称", value: "CT平扫"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                        ]
                    }
                }
            }
        }
    }
}


export const Page_Pharmacist_Verify_Refused=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/verify/refused/index",
                title: "拒绝理由填写页",
                wxcall:{
                    payBillsArea_onSwichItemClick:(item)=>{
                        console.log("payBillsArea_onSwichItemClick invoked = ", item)
                    },
                    confirmBtn_onClick:(txt)=>{
                        console.log("confirmBtn_onClick invoked = ", txt)
                        PageNext(0)
                    }
                },
                data:{
                    paybills_Area:{
                        listData:[
                            {
                                id: "1",
                                canCheck: true,
                                title: {label: "处方类型：", value: "西药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "头孢拉丁胶囊"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ],
                                  [
                                    {label: "药品名称", value: "阿莫西林分散片"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ]
                                ]
                              },
                              {
                                id: "2",
                                canCheck: true,
                                title: {label: "处方类型：", value: "中药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "当归"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                              {
                                id: "3",
                                canCheck: true,
                                title: {label: "处方类型：", value: "检查"},
                                contents:[
                                  [
                                    {label: "项目名称", value: "CT平扫"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                        ]
                    }
                }
            }
        }
    }
}



export const Page_Pharmacist_Verify_See=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/verify/see/index",
                title: "审核操作页",
                wxcall:{
                    // 通过按钮
                    passBtn_onClick:()=>{
                        console.log("passBtn_onClick invoked ")
                        const num = GPage.util.createRandomNum(1);
                    },
                    refuseBtn_onClick:()=>{
                        console.log("refuseBtn_onClick invoked ")
                    }
                },
                data:{
                    verifyResult: "审核通过",
                    forms:[
                        {"label": "姓  名", "value":"喜洋洋"},
                        {"label": "年  龄", "value":"23 岁"},
                        {"label": "性  别", "value":"男"},
                        {"label": "手机号", "value":"18651234456"},
                        {"label": "创建日期", "value":"2022-03-03"},
                    ],
                    zdxx: "肺结核待查，需要做CT平扫，血常规。业务处理",
                    paybills_Area:{
                        listData:[
                            {
                                id: "1",
                                title: {label: "处方类型：", value: "西药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "头孢拉丁胶囊"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ],
                                  [
                                    {label: "药品名称", value: "阿莫西林分散片"},
                                    {label: "数    量", value: "2 盒"},
                                    {label: "用法用量", value: "一天2次，每次1粒"},
                                    {label: "备注", value: "无"},
                                  ]
                                ]
                              },
                              {
                                id: "2",
                                title: {label: "处方类型：", value: "中药"},
                                contents:[
                                  [
                                    {label: "药品名称", value: "当归"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                              {
                                id: "3",
                                title: {label: "处方类型：", value: "检查"},
                                contents:[
                                  [
                                    {label: "项目名称", value: "CT平扫"},
                                    {label: "数    量", value: "15g"},
                                    {label: "用法用量", value: "一天2次，每次1g"},
                                    {label: "备注", value: "无"},
                                  ],
                                ]
                              },
                        ]
                    }
                }
            }
        }
    }
}


export const Page_Pharmacist_Verify_Result=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/result/index",
                title: "结果页",
                wxcall:{
                    okBtn_onClick:()=>{
                        console.log("okBtn_onClick invoked")
                        PageNext(0);
                    }
                },
                data: {
                    primaryMsg: "填写完成",
                    subMsg: "请点击确认返回",
                }
            }
        }
    }
}