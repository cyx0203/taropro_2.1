import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_BtnList, Comp_Table } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "../../../core/root";
import styles from "./style/index.module.scss";
import mjcom from "@/GGCore/mjcommon";
import { AtIcon, AtModalContent, AtModal } from "taro-ui";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_reportDetails_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.detailsArea],
        () => {
          if (nda.detailsArea.hasOwnProperty("contents")) {
            let dataObj = { ...nda.detailsArea };
            let dataArr = dataObj.contents.body;
            for (let i = 0; i < dataArr.length; i++) {
              if (dataArr[i].flag === "high")
                dataArr[
                  i
                ].res = `<span style="color:red">${dataArr[i].res}</span>`;
              if (dataArr[i].flag === "low")
                dataArr[
                  i
                ].res = `<span style="color:blue">${dataArr[i].res}</span>`;
            }
            setDetailsArea(dataObj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.topTips],
        () => {
          setTopTips(nda.topTips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [detailsArea, setDetailsArea] = useState(GPage.Data.detailsArea);
  const [topTips, setTopTips] = useState(GPage.Data.topTips);
  useEffect(() => {
    if (detailsArea.hasOwnProperty("contents")) {
      let dataObj = { ...detailsArea };
      let dataArr = dataObj.contents.body;
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].flag === "high")
          dataArr[i].res = `<span style="color:red">${dataArr[i].res}</span>`;
        if (dataArr[i].flag === "low")
          dataArr[i].res = `<span style="color:blue">${dataArr[i].res}</span>`;
      }
      setDetailsArea(dataObj);
    }
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
      <View className={styles.reportDetails}>
        <View className={styles.headline}>{detailsArea.type}</View>
        <View className={styles.topTips}>
          <Text>{topTips}</Text>
        </View>
        <View
          className={styles.info}
        >
          {GPage.Map(
            detailsArea.info,
            (item: any, index: any) => {
              return (
                <View
                  className={styles.infoItem}
                  key={`reportDetails-key-${index}`}
                >
                  <View className={styles.infoLabel}>{item.label}：</View>
                  <View className={styles.infoValue}>{item.value}</View>
                </View>
              );
            },
            ""
          )}
        </View>
        <View
          style={{
            display: detailsArea.hasOwnProperty("contents") ? "" : "none"
          }}
        >
          <Comp_Table type="02" config={detailsArea.contents} />
        </View>
      </View>
    </Root>
  );
}
