import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_AddUser = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        nationList: ["汉族","内蒙古族", "回族"],
        // 输入框的默认文案
        inputPlaceholder: "必填11",
        // 温馨提示数据
        warmPrompt: {
          // 温馨提示小ICON
          icon: "@warn",
          // 温馨提示主标题
          title: "温馨1提示：",
          // 温馨提示内容
          content:
            "请输入您的11姓名、身份证号、联系方式等信息，建档成功后即可实现微信平台线上的就诊业务办理！"
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/addUser/index",
        title: "添加用户",
        wxcall: {
          addUserClick: item => {
            console.log("添加用户");
            console.log(item);
          }
        },
        data: {
          nationList: ["汉族", "苗族", "水族", "维吾尔族", "藏族", "土家族"],
          // 输入框的默认文案
          inputPlaceholder: "必填",
          // 温馨提示数据
          warmPrompt: {
            // 温馨提示小ICON
            icon: "@warn",
            // 温馨提示主标题
            title: "温馨提示：",
            // 温馨提示内容
            content:
              "请输入您的姓名、身份证号、联系方式等信息，建档成功后即可实现微信平台线上的就诊业务办理！"
          }
        }
      }
    };
  }
};
