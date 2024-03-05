import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "../../../core/root";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
// import "./style/index.scss";
import styles from "./style/index.module.scss";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_hospitalIntroduction_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.hospitalData],
        () => {
          setData(nda.hospitalData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [hospitalData, setData] = useState(GPage.Data.hospitalData);
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
      <View className={styles.hospitalIntroduction}>
        <View className={styles.header_main}>
          <View className={styles.cap}></View>
          <View className={styles.pic}>
            <Image src={hospitalData.hospitalImg} className={styles.img} />
          </View>
        </View>
        <View className={styles.hospitalName}>{hospitalData.name}</View>
        <View className={styles.info_main}>
          {GPage.Map(
            hospitalData.introduction,
            (item: any, index: any) => {
              return <View className={styles.line_item}>{item}</View>;
            },
            ""
          )}
        </View>
      </View>
    </Root>
  );
}
