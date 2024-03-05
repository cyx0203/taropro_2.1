import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_UserECard, Comp_Result } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";
import { AtButton } from "taro-ui";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_TJXRMYY_patientIDcard_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userCardData],
        () => {
          let obj: any = resultData;
          if (nda.userCardData && nda.userCardData.hasOwnProperty("emptyTips")) {
            obj.title = nda.userCardData.emptyTips;
          }
          setResultData(obj);
          setuserCardData(handleData(nda.userCardData.cardList))
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setfooterBtn(nda.footerBtn);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  const [userCardData, setuserCardData] = useState(GPage.Data.userCardData);
  const handleData = data => {
    // 创建空对象存储数据
    let content: any = {
      defaultIndex: "",
      list: [],
      isEmpty: userCardData.isEmpty,
      emptyTips: userCardData.emptyTips
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
    return content
  };
  useEffect(() => {
    let obj: any = resultData;
    if (userCardData && userCardData.hasOwnProperty("emptyTips")) {
      obj.title = userCardData.emptyTips;
    }
    setResultData(obj);
    // 数据结构处理
    setuserCardData(handleData(userCardData.cardList));
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
      <View className={styles.patientIDcard}>
        {userCardData && userCardData.isEmpty === "N" ? (
          <Comp_UserECard
            type="02"
            config={userCardData}
            onItemClick={(item, index) => {
              GPage.DoWXCall("onItemClick", item, index);
            }}
            onDefaultClick={(item, index) => {
              GPage.DoWXCall("onDefaultClick", item, index);
              
            }}
          ></Comp_UserECard>
        ) : (
          <View className={styles.result}>
            {resultData ? <Comp_Result config={resultData} type="01" /> : ""}
          </View>
        )}

        <AtButton
          type="primary"
          onClick={() => {
            GPage.DoWXCall("onAddClick");
            
          }}
        >
          {footerBtn}
        </AtButton>
      </View>
    </Root>
  );
}
