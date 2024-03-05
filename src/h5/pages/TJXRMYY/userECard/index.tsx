import React, { useEffect, useState } from "react";
import {
  useReady,
  useDidShow,
  useDidHide,
  getClipboardData
} from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
// import { * } from "taro-ui";
//原生组件
import { View } from "@tarojs/components";
//自定义组件
import { Comp_Result, Comp_UserECard } from "@/GGCompLib";
import { AtButton } from "taro-ui";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_userECard_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setfooterBtn(nda.footerBtn)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.userCardData],
        () => {
          setNewData(handleData(nda.userCardData.cardList))
        },
        () => {
          console.log('Fail');
        }
      );
    }
  });
  //定义state
  const [userCardData] = useState(GPage.Data.userCardData);
  const [newData, setNewData] = useState({});
  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  // 对透传数据进行处理
  const handleData = data => {
    // 创建空对象存储数据
    let content: any = {
      defaultIndex: "",
      list: [],
      isEmpty: userCardData.isEmpty
    };

    for (let i = 0; i < data.length; i++) {
      let objData = {
        cardBg: "",
        cardTxt: "",
        content: [],
        extend: ""
      };
      // 设置默认索引
      if (data[i].default) content.defaultIndex = i;
      // 选中文字
      objData.cardTxt = data[i].activeText;
      // 背景图
      objData.cardBg = data[i].bgImg;
      // 内容
      objData.content.push(data[i].firstLine);
      // 左上文字
      objData.extend = data[i].leftLine;
      objData.content.push(data[i].secondLine);
      content.list.push(objData);
    }
    return content;
  };
  useEffect(() => {
    setNewData(handleData(userCardData.cardList));
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  return (
    <Root hashData={styles}>
      <View className={styles.userCard}>
        {userCardData && userCardData.isEmpty === "N" ? (
          <Comp_UserECard
            type="02"
            config={newData}
            onItemClick={(item, index) => {
              GPage.DoWXCall("cardClick", item, index);
            }}
            onDefaultClick={(item, index) => {
              GPage.DoWXCall("defaultClick", item, index);
            }}
          />
        ) : (
          <View className={styles.result}>
            {resultData ? <Comp_Result config={resultData} type="01" /> : ""}
          </View>
        )}
        <AtButton
          type="primary"
          onClick={() => {
            GPage.DoWXCall("addUserCard");
          }}
          customStyle={{display:footerBtn?'':'none'}}
        >
          {footerBtn}
        </AtButton>
        <AtButton
          type="secondary"
          onClick={() => {
            GPage.DoWXCall("otherBtnClick");
          }}
          customStyle={{display:GPage.Data.otherBtn?'':'none'}}
        >
          {GPage.Data.otherBtn}
        </AtButton>
      </View>
    </Root>
  );
}
