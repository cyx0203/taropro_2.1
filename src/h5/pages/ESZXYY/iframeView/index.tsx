import React, { useEffect, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon,
  AtInput,
  AtImagePicker,
  AtToast
} from "taro-ui";
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Radio,
  WebView
} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_iframeView_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      // GPage.SetState(
      //   [nda.stepTxt],
      //   () => {
      //     setStepTxt(nda.stepTxt);
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
    }
  });
  const [webSrc, setWebSrc] = useState(GPage.Data.webSrc || "");
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
      <View className={styles.iframeView}>
        <WebView src={webSrc} />
      </View>
    </Root>
  );
}
