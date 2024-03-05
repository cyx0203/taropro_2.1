import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
// import { * } from "taro-ui";
//原生组件
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
//自定义组件
// import { * } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_cardLogin_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.patientCardInfo],
        () => {
          setpatientCardInfo(patientCardInfo);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  //定义state
  const [patientCardInfo, setpatientCardInfo] = useState(
    GPage.Data.patientCardInfo
  );

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
      <View className={styles.cardLogin}>
        <View className={styles.header}>
          <View className={styles.tips}>请选择就诊人</View>
          <View className={styles.btn} onClick={() => {GPage.DoWXCall('changeLoginType')}}>其他登录方式</View>
        </View>
        <View className={styles.card}>
          <Image src={patientCardInfo.icon} className={styles.img}/>
          <View className={styles.info}>
            <View className={styles.name}>{patientCardInfo.name}</View>
            <View className={styles.number}>{patientCardInfo.number}</View>
          </View>
          <View className={styles.btn}  onClick={() => {GPage.DoWXCall('onSelectClick')}}>{patientCardInfo.cardBtn}</View>
        </View>
        <AtButton  onClick={() => {GPage.DoWXCall('onAddClick')}}>{patientCardInfo.footerBtn}</AtButton>
      </View>
    </Root>
  );
}
