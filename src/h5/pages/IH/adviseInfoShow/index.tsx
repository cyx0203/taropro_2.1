import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { Button, View } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result } from "@/GGH5/ggcomplib";
import {} from "taro-ui";
import _ from "lodash";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_adviseInfoShow_index",
    ndaExcute: (nda: any) => {
      // GPage.SetState(
      //   [nda.resultData],
      //   () => {
      //     setResultData(nda.resultData);
      //   },
      //   () => {
      //     console.error("NDA设置出错");
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
      <View className={styles.adviseInfoShow}>
        {GPage.Map(
          GPage.Data.infoList,
          (item, index) => {
            return (
              <View className={styles.adviseFormItem} key={index}>
                <View className={styles.label}>{item.label}</View>
                <View className={styles.value}>{item.value}</View>
              </View>
            );
          },
          null
        )}
        <View className={styles.formBlock}>
          <View className={styles.blockLable}>
            <View className={styles.line} />
            留言内容
          </View>
          <View className={styles.blockValue}>{GPage.Data.message}</View>
        </View>
        <View className={styles.formBlock}>
          <View className={styles.blockLable}>
            <View className={styles.line} />
            回复内容
          </View>
          <View className={styles.blockValue}>{GPage.Data.reply}</View>
        </View>
      </View>
    </Root>
  );
}
