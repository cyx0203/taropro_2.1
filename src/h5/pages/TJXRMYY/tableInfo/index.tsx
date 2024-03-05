import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtList, AtListItem, AtIcon } from "taro-ui";
//原生组件
import { View, Image, Picker, Text } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
import Table from "../../../components/Table/index";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_tableInfo_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setStartTime(nda.dateSelector.startDate);
          setEndTime(nda.dateSelector.endDate);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tableData],
        () => {
          setTableData(nda.tableData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.total],
        () => {
          setTotal(nda.total);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [tableData, setTableData] = useState(GPage.Data.tableData);
  const [total, setTotal] = useState(GPage.Data.total);
  const [dateSelector] = useState(GPage.Data.dateSelector);
  const [startTime, setStartTime] = useState(
    GPage.Data.dateSelector ? GPage.Data.dateSelector.startDate : ""
  );
  const onStartTimeChange = e => {
    setStartTime(e.detail.value);
    GPage.DoWXCall("onDateClick", "startTime", e.detail.value);
  };
  const [endTime, setEndTime] = useState(
    GPage.Data.dateSelector ? GPage.Data.dateSelector.endDate : ""
  );
  const onEndTimeChange = e => {
    setEndTime(e.detail.value);
    GPage.DoWXCall("onDateClick", "endTime", e.detail.value);
  };
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
      <View className={styles.tableInfo}>
        <View
          className={styles.dateSelect}
          style={{ display: GPage.Data.dateSelector.isShow ? "" : "none" }}
        >
          <Picker mode="date" onChange={onStartTimeChange}>
            <AtList>
              <AtListItem extraText={startTime} />
            </AtList>
          </Picker>
          {dateSelector?.endDate ? (
            <AtIcon
              customStyle={{ margin: "0 20px" }}
              value="arrow-right"
              size="30"
              color="#000"
            ></AtIcon>
          ) : (
            ""
          )}
          {dateSelector?.endDate ? (
            <Picker mode="date" onChange={onEndTimeChange}>
              <AtList>
                <AtListItem extraText={endTime} />
              </AtList>
            </Picker>
          ) : (
            ""
          )}
          {/* <AtIcon
            customStyle={{ marginLeft: "60px" }}
            value="calendar"
            size="30"
            color="#000"
          ></AtIcon> */}
        </View>
        <Table tableData={tableData} />
        <View className={styles.lastColumn}>
          <View className={styles.tbody}>总计</View>
          <View className={styles.tbody}>{total}元</View>
        </View>
      </View>
    </Root>
  );
}
