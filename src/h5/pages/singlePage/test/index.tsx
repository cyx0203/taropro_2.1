import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
var _ = require("lodash");
//TaroUI的组件
import {
  AtButton,
  AtInput,
  AtSwitch,
  AtToast,
  AtList,
  AtListItem
} from "taro-ui";
//原生组件
import { View, RadioGroup, Label, Radio, Picker } from "@tarojs/components";
//自定义组件

//模板主体
export default function main() {


  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});


  return (
    <View>
      111
    </View>
  );
}
