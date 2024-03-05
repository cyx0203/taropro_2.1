import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/drawboard/docdetail/index",
        title: "医生详情",
        wxcall: {
          scheduleOnClick: (item,index,amorpm) => {
            console.log("scheduleOnClick");
            console.log(item,index,amorpm);
            UpateCurrentPageData({ timelist: ['13:00-13:30', '13:31-14:00', '14:00-14:30', '14:31-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30'] })
            UpateCurrentPageData({ rest: [0, 1, 2, 3, 4, 5, 0] })
            },
            appointmentOnClick: (index) => {
                console.log('appointmentOnClick')
                console.log(index)
                UpateCurrentPageData({appointmentShow:true})
            },
            appointmentTypeOnClick: (item,index) => {
                console.log('选择类型为' + item.type)
                console.log(index)
            },
            noticeClick: (item,index) => {//关注医生
                console.log(item)
                UpateCurrentPageData({active_index:index===0?1:0})
            },
        },
        data: {
            patientinfor: {
                //患者头像
                pic: `${RES}/assets/img/user.svg`,
                //患者姓名
                name: "张三",
                //第一行额外数据
                extra1: "男",
                //第二行额外数据
                extra2: "卡号：32030303030303",
              },
            //医师信息
            userInfo: {
                icon: `${RES}/assets/img/doctor.svg`,
                name: '陈玉香',
                job: '主任医师',
                tTitle: '内分泌科互联网门诊专家',
                // briefIntro:'1234567890asdfghjklzxcvbnmqwertyuiopzxcvbnmasdfghjkl',
                briefIntro: '擅长皮冠脉介入治疗（PCI及支架安装术）心包介入 先心病介入治疗和内科疑难病的治疗',
                serviceTime: 35,
                rate: 4.8
            },
            // notice:false,
            //医生排班表
            schedule: [
                {
                    date: '2021-8-24',
                    week: '星期二',
                    am: {
                        st: 0,
                    },//按钮状态，1为可按，0为不可约的禁用
                },
                {
                    date: '2021-8-25',
                    week: '星期三',
                    am: {
                        st: 1,
                        rest: [0, 0, 25, 10, 0, 15, 12]//剩余可预约数量
                    },
                    pm: { st: 1 }

                },
                {
                    date: '2021-8-26',
                    week: '星期四',
                    pm: {
                        st: 1,
                        rest: [10, 0, 5, 1, 0, 15, 2]
                    }
                }, {
                    date: '2021-8-27',
                    week: '星期五',
                    am: { st: 0 }
                },
                {
                    date: '2021-8-28',
                    week: '星期六',
                    am: {
                        st: 1,
                        rest: [0, 0, 25, 10, 0, 15, 12]
                    },
                    pm: { st: 0 }

                },
                {
                    date: '2021-8-29',
                    week: '星期日',
                    pm: {
                        st: 1,
                        rest: [0, 0, 25, 10, 0, 15, 12]
                    }
                },
                {
                    date: '2021-8-30',
                    week: '星期一',
                    pm: {
                        st: 1,
                        rest: [0, 0, 25, 10, 0, 15, 12]
                    }
                }
            ],
            //预约方式
            ConsultationList: [
                {
                    type: 'imgtext',
                    text:'图文问诊',
                    imgurl: `${RES}/assets/icon/inquiry_text.svg`,
                    money: '免费'
                },
                {
                    type: 'voice',
                    text: '语音问诊',
                    imgurl: `${RES}/assets/icon/inquiry_video.svg`,
                    money: '20.00元'
                },
                {
                    type: 'video',
                    text: '视频问诊',
                    imgurl: `${RES}/assets/icon/inquiry_voice.svg`,
                    money: '30.00元'
                }
            ],
            switch:[ // 选择状态
                {label: "已关注", id: "flowed"},
                {label: "点击关注", id: "flow"}
            ],
            active_index:0,
            title:'预约', // 底部弹出抽屉的标题
        }
      }
    };
  }
};
