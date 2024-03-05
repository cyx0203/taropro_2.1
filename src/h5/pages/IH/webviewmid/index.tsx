import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View } from "@tarojs/components";
import { Current } from "@tarojs/taro";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_webviewmid_index",
    ndaExcute: (nda: any) => {
      // GPage.SetState(
      //   [nda.topTips],
      //   () => {
      //     setTopTips(nda.topTips)
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
  useDidShow(() => {
    const data: any = Current.router?.params;
    // window.GG.WebViewDt = data;
    const wvFlw = data.wvFlwName;
    getWVFlw(wvFlw,data);
  });

  //对应：onHide
  useDidHide(() => {});

  /**
   * @param wvFlwName ……wvflw文件夹下指定流程js文件名称（不带后缀）
   * @param data ……h5模块传过来的数据
   */
  const getWVFlw = (wvFlwName: string, data: any) => {
    let ret = require(`../../flow/${wvFlwName}.js`);
    ret.default.excuteflow(data);
  };
  return (
    <Root hashData={styles}>
      <View className={styles.webviewmid}></View>
    </Root>
  );
}
