import React, { useEffect, useState } from "react";
import { View} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_BtnList,
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_inquireReceipts_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.btnList],
        () => {
          setBtnList(nda.btnList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [btnList,setBtnList] = useState(GPage.Data.btnList)
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
      <View className={styles.inquireReceipts}>
        <Comp_BtnList
          config={btnList}
          type="01"
          onItemClick={(item, index) => {
            GPage.DoWXCall('onDeptClick',item,index)
          }}
        />
      </View>
    </Root>
  );
}
