import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //     UpateCurrentPageData({
    //         //Todo
    //     });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/result/index",
        title: "",
        wxcall: {
          footerBtnClick:() => {
            console.log('确认')
          }},
        data: {
          // 提示弹窗数据
          toastData:{
            icon: `${RES}/assets/icon/energyBall.png`,
            //内容
            content: `<span>预约挂号预计得蚂蚁森林能量<span style='color:green'>277g</span></span>`,
            // 持续时间 单位:秒 s 
            duration:0
          },
          // 结果信息
          resultInfo:[
            {
              label:'预约科室',value:'疼痛科门诊',
            },
            {
              label:'医生姓名',value:'张三',
            },
            {
              label:'就诊时间',value:'2022-11-25',
            },
            {
              label:'就诊时段',value:'2022-11-25 11：15-11：20 40号',
            },
            {
              label:'就诊人',value:'李四',
            },
            {
              label:'挂号费',value:`<span style='color:red'>￥5.5</span>`,
            },
            {
              label:'就诊位置',value:'门诊七楼疼痛科门诊诊室',
            },
          ],
          resultData: {
            //[*] ICON
            // icon: '@fail',
            icon: '@fail',
            //[*] 主标题
            title: "退号成功",
            //[-] 副标题
            subTitle: "退号成功"
          },
          footerBtn:'确认'
        }
      }
    };
  }
};
