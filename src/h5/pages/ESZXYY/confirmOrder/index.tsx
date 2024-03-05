import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_Result } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

import { Root } from "../../../core/root";
import { AtModal, AtModalContent } from "taro-ui";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_confirmOrder_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
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
  const [infoHos, setinfoHos] = useState(GPage.Data.infoHos);
  const [payInfo, setpayInfo] = useState(GPage.Data.payInfo);
  const [footerInfo, setfooterInfo] = useState(GPage.Data.footerInfo);
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
      <View className={styles.confirmOrder}>
        <View className={styles.header}>
          <View className={styles.hosInfo}>
            <View className={styles.hosTxt}>
              <Text className={styles.hosTxt_label}>{infoHos.info.label}</Text>
              <Text className={styles.hosTxt_value}>{infoHos.info.value}</Text>
            </View>
            <Image src={infoHos.icon} className={styles.hosIcon} />
          </View>
        </View>
        <View className={styles.content}>
          <View className={styles.payInfo}>
            {payInfo.info.map((item, index) => {
              return (
                <View
                  className={styles.payInfoItem}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></View>
              );
            })}
            {payInfo.hasOwnProperty("btn") ? (
              <Button
                className={styles.payBtn}
                onClick={() => {
                  GPage.DoWXCall("checkClick");
                }}
              >
                {payInfo.btn}
              </Button>
            ) : (
              ""
            )}
          </View>
          <Image src={payInfo.icon} className={styles.payIcon} />
        </View>
        <View className={styles.footer}>
          <View dangerouslySetInnerHTML={{ __html: footerInfo.txt }}></View>
          <Button
            className={styles.footerBtn}
            onClick={() => {
              GPage.DoWXCall("payClick");
            }}
          >
            {footerInfo.btn}
          </Button>
        </View>
      </View>
    </Root>
  );
}
