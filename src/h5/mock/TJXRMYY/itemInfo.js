import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/itemInfo/index",
        title: "项目信息",
        wxcall: {
          searchClick: keyword => {
            console.log(keyword);
          },
          onItemClick: (item, index) => {
            console.log(item, index);
          },
          activeClick:(item,index) => {
            console.log('==activeClick==');
            console.log(item,index)
          },
          floatBtnClick:() => {
            console.log('浮动添加点击事件')
          }
        },
        data: {
          // 搜索框内默认文字
          searchPlaceholder: "请输入内容",
          mainContentData: {
            isEmpty: "N",
            listData: [
              {
                id: 1,
                name: "血液常规(五分类)",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                btn:'已添加',
                active:true,
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 4,
                name: "尿妊娠试验",
                univalence: "18",
                btn:'已添加',
                active:true,
              },
              {
                id: 1,
                name: "血液常规(五分类)",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 4,
                name: "尿妊娠试验",
                univalence: "18",
                btn:'添加',
                active:false,
              },
              {
                id: 1,
                name: "血液常规(五分类)",
                univalence: "18",
                btn:'已添加',
                active:true,
              },
            ]
          },
          // 当isEmpty为Y时
          resultData: {
            icon: "@empty",
            title: "暂未查询到内容"
          }
        }
      }
    };
  }
};
