import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View, WebView } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_BtnList } from "@/GGH5/ggcomplib";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_reportQuery_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.contentArea],
        () => {
          setContentArea(nda.contentArea);
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
  const [contentArea, setContentArea] = useState(GPage.Data.contentArea);
  const [topTips, setTopTips] = useState(GPage.Data.topTips);
  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const handleMessage = () => {};
  return (
    <Root hashData={styles}>
      <View className={styles.reportQuery}>
        <View className={styles.topTips}>{topTips}</View>
        {GPage.Map(
          contentArea,
          (item: any, index: any) => {
            return (
              <Comp_BtnList
                className={styles.btnItem}
                config={item}
                type="01"
                onItemClick={item1 => {
                  GPage.DoWXCall("onCheckClick", item1, index);
                }}
              />
            );
          },
          ""
        )}
      </View>
    </Root>
  );
}
