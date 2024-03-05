import { StepNext, PageNext, PageRelaunch, DataCache, StepContent, 
    RealGotoAjax, RealGotoPage, RealGotoPageBack, RealRelaunchToPage,
    UpateCurrentPageData } from "../../core/engine";
import JsUtil from "../utils/jsutil";

export const Page_Pharmacist_Distribution_Masters=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/distribution/masters/index",
                title: "发药管理页",
                wxcall:{
                    verifyCards_onItemClick:(item)=>{
                        console.log("verifyCards_onItemClick invoked = ", item)
                        // debugger
                        if(item.id==='send') PageNext(0);
                        else if(item.id==='see') PageNext(1);
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
                                    { label: "订单状态", value: "已支付", color: "#F59A23"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "send", btnName: "配送" },
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
                                    { label: "订单状态", value: "已接收", color: "#70B603"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "物流" },
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
                                    { label: "订单状态", value: "已召回", color: "#A30014"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "物流" },
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
                                    { label: "订单状态", value: "配送中", color: "#0000BF"},
                                    { label: "创建时间", value: "2022-01-02 12:00:00" },
                                ],
                                rightBtns: [
                                    { id: "see", btnName: "物流" },
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
}


export const Page_Pharmacist_Distribution_Input =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/distribution/input/index",
                title: "配送地址输入页",
                wxcall:{
                    confirmBtn_onClick:(id)=>{
                        console.log("confirmBtn_onClick invoked = ", id)
                        PageNext(0);
                    }
                },
                data:{
                    forms:[
                        {label: "患者姓名", value: "喜洋洋"},
                        {label: "年    龄", value: "29 岁"},
                        {label: "性    别", value: "男"},
                        {label: "手 机 号", value: "18651234456"},
                        {label: "创建时间", value: "2022-01-02 11:00:00"},
                        {label: "开方医生", value: "王医生"},
                        {label: "审核药师", value: "李药师"},
                    ]
                }
            }
        }
    }
}

export const Page_Pharmacist_Distribution_Details =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/distribution/details/index",
                title: "配送地址输入页",
                wxcall:{},
                data:{
                    forms:[
                        {label: "收件人姓名", value: "喜洋洋"},
                        {label: "收件人地址", value: "安徽省宣城市宣州区夏渡新城"},
                        {label: "收件人电话", value: "18651234456"},
                        {label: "配送单号", value: "SF234234234234233"},
                    ],
                    distribution_details: [
                        { id: 111, content: '已签收,签收人：门卫', ctime: '2017-1-11 17:59' },
                        { id: 222, content: '快递已达成都', ctime: '2017-1-10 17:59' },
                        { id: 222, content: '快递已达四川', ctime: '2017-1-10 17:59' },
                        { id: 222, content: '快递已达武汉', ctime: '2017-1-10 17:59' },
                        { id: 222, content: '快递已达天津', ctime: '2017-1-10 17:59' },
                        { id: 222, content: '快递已达北京', ctime: '2017-1-10 17:59' },
                        { id: 222, content: '快递已打包', ctime: '2017-1-10 17:59' }
                    ]
                }
            }
        }
    }
}


export const Page_Pharmacist_Distribution_Result=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/result/index",
                title: "结果页",
                wxcall:{
                    okBtn_onClick:(item)=>{
                        console.log("okBtn_onClick invoked = ", item)
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