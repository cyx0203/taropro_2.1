import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/confirmInfo/index",
        title: "",
        wxcall: {
          // 切换就诊人点击事件
          changePatient: () => {
            console.log("切换就诊人");
          },
          // 确认按钮点击事件
          confirm: () => {
            console.log("确认");
          },
          // 取消按钮点击事件
          cancel: () => {
            console.log("取消");
          }
        },
        data: {
          // 按钮集合。注释掉字段 或者 txt为 '' 代表按钮隐藏（不启用该按钮） 
          btns: {
            changePatient: {
              txt: "",
              disabled: false
            },
            confirm: {
              txt: "确认并支付",
              disabled: true
            },
            cancel: {
              txt: "取消预约",
              disabled: false
            }
          },
          // 就诊人挂号信息列表反显
          content: [
            { label: "就诊科室", value: "消化内科门诊" },
            {
              label: "就诊医生",
              value:
                "二维测值、单位mm 右室流出道28\t 右心室内径22\t 左心室后壁11\t 肺动脉根部19 主动脉根部25\t 室间隔厚度13\t 右心房横径37\t 右心室前壁厚 左心房内径38\t 左心室内径Dd38\t 右心房纵径46\t 左心室内径DsAAO:31mm，左房增大，余各房室大小正常。主、肺动脉内径正常。各瓣膜形态、结构及活动未见明显异常。室间隔与左室后壁增厚。心包腔内未见液性暗区。M型超声\tMV-EF斜率未见异常，AOW搏幅未见异常。 彩色血流\t各瓣膜口未见返流，MR+,TR+,AR+,PR+,房室间隔及大动脉未见异常血流。室壁运动分析:\t静息状态下，室间隔及左室壁收缩活动未见明显减低。 左室舒张功能测值：VE:55 cm/s VA：103cm/s VE/VA＜ 1 TDI:Em:6.5cm/s，Em/Am：＜ 1 舒张功能评价： 驰张功能减低 。左室收缩功能测值：EF:65％ 　收缩功能评价：正常。"
            },
            { label: "挂号类别", value: "普通门诊" },
            { label: "就诊时间", value: "2022-04-26（昼夜）" },
            { label: "就诊费用", value: "35.0元" },
            { label: "就诊卡号", value: "41521212" }
          ],
          // 就诊人信息
          patient: "张三李四",
          // 温馨提示内容
          warmPrompt: {
            //标题
            title: "温馨提示：",
            // 内容
            content:
              "请核对您的挂号信息！只支持隔日预约退号；当日挂号成功后不能退号。"
          }
        }
      }
    };
  }
};
