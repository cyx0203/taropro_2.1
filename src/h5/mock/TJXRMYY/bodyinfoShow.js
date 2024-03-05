import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/bodyinfoShow/index",
        title: "身体部位详细信息",
        wxcall: {
          mainRegister: () => {
            console.log("去挂号");
          },
          register: (item, index) => {
            console.log("去挂号");
            console.log(item, index);
          }
        },
        data: {
          assets:{
            deptImg:`${RES}/assets/icon/dept.svg`
          },
          infoData: {
            title: "胸骨后疼痛",
            btn: "去挂号",
            rec_dept: [
              { title: "心胸外科" },
              { title: "心胸外科", btn: "去挂号" },
              { title: "心胸外科", btn: "去挂号" },
              { title: "心胸外科" }
            ],
            tabList: [
              {
                title: "简介",
                value: {
                  question: "什么是胸骨后疼痛4？",
                  value:
                    "胸骨后闷胀、疼痛，要警惕食管癌。食管癌的早期征象或早期症状除了喉部的异样感外，有时候或有些病人还存在胸骨后症状，主要表现为胸骨后的闷胀不适感和疼痛感，少数人也会有剑突（心口)下疼痛感。                  "
                }
              },
              {
                title: "诊断",
                value: {
                  value:
                    "胸骨后闷胀、疼痛，要警惕食管癌。食管癌的早期征象或早期症状除了喉部的异样感外，有时候或有些病人还存在胸骨后症状，主要表现为胸骨后的闷胀不适感和疼痛感，少数人也会有剑突（心口)下疼痛感。                  "
                }
              },
              {
                title: "病因",
                value: {
                  value:
                    "胸骨后闷胀、疼痛，要警惕食管癌。食管癌的早期征<br/>象或早期症状除了喉部的异样感外，有时候或有些病人还存在胸骨后症状，主要表现为胸骨后的闷胀不适感和疼痛感，少数人也会有剑突（心口)下疼痛感。                  "
                }
              },
              {
                title: "治疗",
                value: {
                  value:
                    "胸骨后闷胀、疼痛，要警惕食管癌。食管癌的早期征象或早期症状除了喉部的异样感外，有时候或有些病人还存在胸骨后症状，主要表现为胸骨后的闷胀不适感和疼痛感，少数人也会有剑突（心口)下疼痛感。                  "
                }
              }
            ]
          }
        }
      }
    };
  }
};
