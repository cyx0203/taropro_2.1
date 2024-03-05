import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_UserECard } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_SCWJYY_patientSelect_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.userEcardData],
        () => {
          let data = {...nda.userEcardData};
          let content = {
            addBtn: data.addBtn,
            list: [],
            card: data.card
          };
          for (let i = 0; i < data.cards.length; i++) {
            if (data.cards[i].isChecked) content.card.defaultIndex = i;
            content.list.push(data.cards[i].showList);
          }
          setE(content);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [userEcardData, setE] = useState(GPage.Data.userEcardData);
  useEffect(() => {
    let data = { ...userEcardData };
    let content = {
      addBtn: data.addBtn,
      list: [],
      card: data.card
    };
    for (let i = 0; i < data.cards.length; i++) {
      if (data.cards[i].isChecked) content.card.defaultIndex = i;
      content.list.push(data.cards[i].showList);
    }
    setE(content);
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
      <View className={styles.patientSelect}>
        <Comp_UserECard
          config={userEcardData}
          type="01"
          onItemClick={(item, index) => {
            GPage.DoWXCall("onItemClick", item, index);
          }}
          onDefaultClick={(item, index) => {
            GPage.DoWXCall("onDefaultClick", item, index);
          }}
          onAddClick={(item, index) => {
            GPage.DoWXCall("onAddClick", item, index);
          }}
        />
      </View>
    </Root>
  );
}
