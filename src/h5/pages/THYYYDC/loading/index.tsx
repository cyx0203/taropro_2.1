import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

//引入样式
import styles from "./style/index.module.scss";
var _ = require("lodash");
//TaroUI的组件
import {
  AtBadge,
  AtFloatLayout,
  AtIcon,
  AtModal,
  AtModalContent,
  AtButton,
  AtModalHeader
} from "taro-ui";
//原生组件
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Button
} from "@tarojs/components";
//自定义组件
import { Comp_Nav, Comp_Result } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_loading_index",
    ndaExcute: (nda: any) => {
    }
  });
  return (
    <Root hashData={styles}>
      <View className={styles.loading}>
        <View className={styles.block}>
          {new Array(5).fill("").map((item, index) => (
            <Text className={styles.content} key={index} />
          ))}
        </View>
        <View className={styles.tipsTxt}>加载中...</View>
      </View>
    </Root>
  );
}
