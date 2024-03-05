import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View, WebView } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import Taro from "@tarojs/taro";

export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_eHealthCard_index",
    ndaExcute: (nda: any) => {
      // GPage.SetState(
      //   [nda.url],
      //   () => {
      //     setUrl(nda.url)
      //   },
      //   () => {
      //     console.log('Fail');
      //   }
      // );
    }
  });
  useEffect(() => {
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
      <View className={styles.eHealthCard}>
        <health-card-users
          onaddcard={() => {
            GPage.DoWXCall("addCard");
          }}
          onselect={e => {
            GPage.DoWXCall("selectCard", e.detail);
          }}
        />
      </View>
    </Root>
  );
}
