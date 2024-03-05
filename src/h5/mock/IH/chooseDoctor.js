import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/chooseDoctor/index",
        title: "医生选择",
        wxcall: {
          // 搜索框搜索点击事件
          searchOnClick: val => {
            console.log(val);
          },
          switchClick: (bool, item, index) => {
            console.log(bool, item, index);
          },
          deptClick: (item, index) => {
            console.log(item, index);
          },
          doctorClick: (item, index) => {
            console.log(item, index);
          },
          serverClick: (doctor,item, index) => {
            console.log('医生信息：',doctor)
            console.log(item, index);
          },
          floatServerClick: (item, index) => {
            console.log(item, index);
          },
          noticeClick: (item,index) => {//关注医生
            console.log('==noticeClick==')
              console.log(item,index)
          },
        },
        data: {
          // 搜索框提示文字
          searchPlaceholder: "搜索医生",
          // 医生类型
          classifyDoctor: [
            { txt: "全部医生", type: "entire" },
            { txt: "在线医生", type: "online" }
          ],
          // 科室类型
          classifyDept: [
            { txt: "常用科室", type: "1", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "内科", type: "2", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "外科", type: "3", icon: `${RES}/assets/icon/dept.svg` },
            {
              txt: "神经科神经内科",
              type: "4",
              icon: `${RES}/assets/icon/dept.svg`
            },
            { txt: "妇产科", type: "5", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "眼科", type: "6", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "常用科室", type: "1", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "内科", type: "2", icon: `${RES}/assets/icon/dept.svg` },
            {
              txt: "外科",
              type: "3",
              icon: `${RES}/assets/icon/dept.svg`,
              default: true
            },
            {
              txt: "神经科神经内科",
              type: "4",
              icon: `${RES}/assets/icon/dept.svg`
            },
            { txt: "妇产科", type: "5", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "眼科", type: "6", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "常用科室", type: "1", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "内科", type: "2", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "外科", type: "3", icon: `${RES}/assets/icon/dept.svg` },
            {
              txt: "神经科神经内科",
              type: "4",
              icon: `${RES}/assets/icon/dept.svg`
            },
            { txt: "妇产科", type: "5", icon: `${RES}/assets/icon/dept.svg` },
            { txt: "眼科", type: "6", icon: `${RES}/assets/icon/dept.svg` }
          ],
          doctorInfor: {
            isEmpty: "N",
            dataList: [
              {
                image: `${RES}/assets/img/user.svg`,
                name: "胡峒陶",
                identity: "主任医师",
                introduction:
                  "简介：擅长皮冠脉介入治疗（PCI及支架安置术）心包介入先心病介入治疗和心血管内科疑难病的诊治。",
                infor: [
                  {
                    type: "inquiry",
                    text: "问诊量",
                    icon: `${RES}/assets/icon/inquiry_count.svg`
                  },
                  {
                    type: "imgtext",
                    text: "图文",
                    icon: `${RES}/assets/icon/inquiry_text.svg`
                  },
                  {
                    type: "voice",
                    text: "语音",
                    icon: `${RES}/assets/icon/inquiry_voice.svg`
                  },
                  {
                    type: "video",
                    text: "视频",
                    icon: `${RES}/assets/icon/inquiry_video.svg`
                  }
                ],
                stars: 2,
                starIcon: `${RES}/assets/icon/star.svg`,
                // online: '忙碌',
                onlineIcon: `${RES}/assets/icon/badge.png`, //badge.png-在线 badge-gray.png-离线
                isFocus:false,//是否关注
              },
              {
                image: `${RES}/assets/img/user.svg`,
                name: "胡峒陶",
                identity: "主任医师",
                introduction:
                  "简介：擅长皮冠脉介入治疗（PCI及支架安置术）心包介入先心病介入治疗和心血管内科疑难病的诊治。",
                infor: [
                  {
                    type: "inquiry",
                    text: "问诊量",
                    icon: `${RES}/assets/icon/inquiry_count.svg`
                  },
                  {
                    type: "imgtext",
                    text: "图文",
                    icon: `${RES}/assets/icon/inquiry_text.svg`
                  },
                  {
                    type: "voice",
                    text: "语音",
                    icon: `${RES}/assets/icon/inquiry_voice.svg`
                  }
                  // {
                  //   type: "video",
                  //   text: "视频",
                  //   icon:`${RES}/assets/icon/inquiry_video.svg`,
                  // }
                ],
                stars: 2,
                starIcon: `${RES}/assets/icon/star.svg`,
                online: '在线',
                onlineIcon: `${RES}/assets/icon/badge.png`, //badge.png-在线 badge-gray.png-离线
                isFocus:true,//是否关注
              },
              {
                image: `${RES}/assets/img/user.svg`,
                name: "胡峒陶",
                identity: "主任医师",
                introduction:
                  "简介：擅长皮冠脉介入治疗（PCI及支架安置术）心包介入先心病介入治疗和心血管内科疑难病的诊治。",
                infor: [
                  {
                    type: "inquiry",
                    text: "问诊量",
                    icon: `${RES}/assets/icon/inquiry_count.svg`
                  },
                  {
                    type: "imgtext",
                    text: "图文",
                    icon: `${RES}/assets/icon/inquiry_text.svg`
                  }
                  // {
                  //   type: "voice",
                  //   text: "语音",
                  //   icon:`${RES}/assets/icon/inquiry_voice.svg`,
                  // },
                  // {
                  //   type: "video",
                  //   text: "视频",
                  //   icon:`${RES}/assets/icon/inquiry_video.svg`,
                  // }
                ],
                stars: 2,
                starIcon: `${RES}/assets/icon/star.svg`,
                online: '在线',
                onlineIcon: `${RES}/assets/icon/badge.png` //badge.png-在线 badge-gray.png-离线
              },
              {
                image: `${RES}/assets/img/user.svg`,
                name: "张田欣",
                identity: "副主任医师",
                introduction:
                  "简介：擅长皮冠脉介入治疗（PCI及支架安置术）心包介入先心病介入治疗和心血管内科疑难病的诊治。",
                infor: [
                  {
                    type: "inquiry",
                    text: "问诊量",
                    icon: `${RES}/assets/icon/inquiry_count.svg`
                  }
                  // {
                  //   type: "imgtext",
                  //   text: "图文",
                  //   icon:`${RES}/assets/icon/inquiry_text.svg`,
                  // },
                  // {
                  //   type: "voice",
                  //   text: "语音",
                  //   icon:`${RES}/assets/icon/inquiry_voice.svg`,
                  // },
                  // {
                  //   type: "video",
                  //   text: "视频",
                  //   icon:`${RES}/assets/icon/inquiry_video.svg`,
                  // }
                ],
                stars: 2,
                starIcon: `${RES}/assets/icon/star.svg`,
                online: '离线',
                onlineIcon: `${RES}/assets/icon/badge-gray.png` //badge.png-在线 badge-gray.png-离线
              },
              {
                image: `${RES}/assets/img/user.svg`,
                name: "张田欣",
                identity: "副主任医师",
                introduction:
                  "简介：擅长皮冠脉介入治疗（PCI及支架安置术）心包介入先心病介入治疗和心血管内科疑难病的诊治。",
                infor1: [
                  // {
                  //   type: "inquiry",
                  //   text: "问诊量",
                  //   icon: `${RES}/assets/icon/inquiry_count.svg`
                  // }
                  // {
                  //   type: "imgtext",
                  //   text: "图文",
                  //   icon:`${RES}/assets/icon/inquiry_text.svg`,
                  // },
                  // {
                  //   type: "voice",
                  //   text: "语音",
                  //   icon:`${RES}/assets/icon/inquiry_voice.svg`,
                  // },
                  // {
                  //   type: "video",
                  //   text: "视频",
                  //   icon:`${RES}/assets/icon/inquiry_video.svg`,
                  // }
                ],
                stars: 2,
                starIcon: `${RES}/assets/icon/star.svg`,
                online: '离线',
                onlineIcon: `${RES}/assets/icon/badge-gray.png` //badge.png-在线 badge-gray.png-离线
              }
            ]
          },
          resultData: {
            icon: "@empty",
            title: "未查询到科室"
          },
          floatData: {
            isShow: true,
            // 标题
            title: "选择预约",
            // 内容
            dataList: [
              {
                type: "imgtext",
                text: "图文问诊",
                money: "免费",
                icon: `${RES}/assets/icon/inquiry_text.svg`
              },
              {
                type: "voice",
                text: "语音问诊",
                money: "20.00元",
                icon: `${RES}/assets/icon/inquiry_voice.svg`
              },
              {
                type: "video",
                text: "视频问诊",
                money: "30.00元",
                icon: `${RES}/assets/icon/inquiry_video.svg`
              }
            ]
          }
        }
      }
    };
  }
};
