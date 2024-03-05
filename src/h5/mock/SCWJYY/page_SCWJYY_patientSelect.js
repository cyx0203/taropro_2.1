import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_PatientSelect = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        userEcardData: {
          addBtn: {
            icon: "",
            text: "添加就诊人111",
            enable: true
          },
          cards: [
            {
              // 是否选中
              isChecked: false,
              // 卡面内容
              showList: [
                {
                  key: "姓名111",
                  value: "蒋3232**"
                },
                {
                  key: "卡号",
                  value: "320303030303***0010"
                }
              ]
            },
            {
              // 是否选中
              isChecked: true,
              // 卡面内容
              showList: [
                {
                  key: "姓名11",
                  value: "蒋222**"
                },
                {
                  key: "卡号111",
                  value: "32222303030303***0010"
                }
              ]
            }
          ],
          card: {
            activeCardBg: `${RES}/assets/img/ecard-01.png`,
            inactiveCardBg: `${RES}/assets/img/ecard-02.png`,
            activeText: "选中11",
            inactiveText:'设为默认11'
          }
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/patientSelect/index",
        title: "选择就诊人",
        wxcall: {
          // 卡片点击事件
          onItemClick: (item, index) => {
            console.log("点击卡片");
            console.log("==onItemClick==");
            console.log(item, index);
          },
          // 设为默认点击事件
          onDefaultClick: (item, index) => {
            console.log("设为默认");
            console.log("==onDefaultClick==");
            console.log(item, index);
          },
          // 底部按钮添加卡片点击事件
          onAddClick: () => {
            console.log("新增");
            console.log("==onAddClick==");
          }
        },
        data: {
          userEcardData: {
            addBtn: {
              icon: "",
              text: "添加就诊人",
              enable: true
            },
            cards: [
              {
                // 是否选中
                isChecked: true,
                // 卡面内容
                showList: [
                  {
                    key: "姓名",
                    value: "蒋**"
                  },
                  {
                    key: "卡号",
                    value: "320303030303***0010"
                  }
                ]
              },
              {
                // 是否选中
                isChecked: false,
                // 卡面内容
                showList: [
                  {
                    key: "姓名",
                    value: "蒋**"
                  },
                  {
                    key: "卡号",
                    value: "320303030303***0010"
                  }
                ]
              }
            ],
            card: {
              // 被选中时的图片
              activeCardBg: `${RES}/assets/img/ecard-01.png`,
              // 未被选中时的图片
              inactiveCardBg: `${RES}/assets/img/ecard-02.png`,
              // 被选中时的文字
              activeText: "选中1",
              // 未被选中时的文字
              inactiveText:'设为默认11'
            }
          },
          
        }
      }
    };
  }
};
