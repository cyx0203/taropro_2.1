import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtCalendar } from "taro-ui";
//原生组件
import { View, Image, Button } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_selectTime_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.startTime],
        () => {
          setStartTime(nda.startTime);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.endTime],
        () => {
          setEndTime(nda.endTime);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.tips],
        () => {
          setTips(nda.tips);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const [startTime, setStartTime] = useState(GPage.Data.startTime);
  const [tips, setTips] = useState(GPage.Data.tips);
  const [endTime, setEndTime] = useState(GPage.Data.endTime);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [timeValue, setTimeValue] = useState("");
  useEffect(() => {
    console.log(window.location.href);
    console.log(window);
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
      <View className={styles.selectTime}>
        <View className={styles.tips}>{tips}</View>
        <AtCalendar
          minDate={startTime}
          maxDate={endTime}
          onSelectDate={e => {
            setTimeValue(e.value.start);
          }}
        />
        <Button
          className={styles.btn}
          onClick={() => {
            GPage.DoWXCall("selectTime", timeValue);
          }}
        >
          {footerBtn}
        </Button>
      </View>
    </Root>
  );
}
